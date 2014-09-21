<?php

class PersonController extends Controller
{
  const ACTION_ADD_CHILD = 1;

	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionAddChildProcess() {
    $parentId = Util::get($_POST, "parent-id");
    $parentPartnerId = Util::get($_POST, "parent-partner-id");
    $name = Util::get($_POST, "name");
    $birthDate = Util::get($_POST, "birth-date");
    $aliveStatus = Util::get($_POST, "alive-status");
    $deathDate = Util::get($_POST, "death-date");
    $job = Util::get($_POST, "job");
    $address = Util::get($_POST, "address");
    $gender = Util::get($_POST, "gender");
    $phoneNo = Util::get($_POST, "phone-no");
    $history = Util::get($_POST, "history");
    $otherInformation = Util::get($_POST, "other_information");
    $picture = Util::get($_FILES, "picture");

    $transaction = Yii::app()->db->beginTransaction();

    try {
      // required information
      if($parentId == null) {
        throw new Exception(__FUNCTION__ . " > Parent Id is empty");
      }

      // create a new person
      $person = new Person();
      $person->name = $name;
      $person->alive_status = $aliveStatus;
      $person->job = $job;
      $person->address = $address;
      $person->phone_no = $phoneNo;
      $person->history = $history;
      $person->other_information = $otherInformation;

      // process the gender
      $genders = Person::getGenders();
      if(array_key_exists($gender, $genders)) {
        $person->gender = $gender;
      } else {
        $person->gender = Person::GENDER_UNKNOWN;
      }

      // processing the date
      if($birthDate != null) {
        $person->birth_date = date_format(date_create_from_format("d/m/Y", $birthDate), "Y-m-d");
      }
      if($aliveStatus == Person::ALIVE_STATUS_DEATH)  {
        if($deathDate != null) {
          $death = date_format(date_create_from_format("d/m/Y", $deathDate), "Y-m-d");
          if($person->birth_date > $death) {
            $person->death_date = $person->birth_date;
          } else {
            $person->death_date = $death;
          }
        } else {
          $person->death_date = $person->birth_date;
        }
      }

      if(!$person->validate()) {
        throw new Exception(__FUNCTION__ . " > Person Validation fails");
      }
      if(!$person->save()) {
        throw new Exception(__FUNCTION__ . " > Person Save fails");
      }

      // process the picture
      if($picture != null) {
        $tmpName = $picture["tmp_name"];
        $pictureFile = getimagesize($tmpName);
        $newName = md5($person->id . "-picture-");
        $newName = $newName . image_type_to_extension($pictureFile[2]);
        $content = file_get_contents($tmpName);
        $path = Yii::getPathOfAlias("personOriginalPath") . "/" . $newName;
        if(!file_put_contents($path, $content)) {
          throw new Exception(__FUNCTION__ . " > Write picture fail");
        }
        $person->picture = $newName;
        if(!$person->save()) {
          throw new Exception(__FUNCTION__ . " > Person Save fails");
        }
      }

      // process the hierarchy
      $hierarchy = new Hierarchy();
      $parent = Person::model()->findByPk($parentId);
      if($parent == null) {
        throw new Exception(__FUNCTION__ . " > Parent not found");
      }
      $hierarchy->child_id = $person->id;
      if($parent->gender == Person::GENDER_MALE || $parent->gender == Person::GENDER_UNKNOWN) {
        $hierarchy->father_id = $parent->id;
        $hierarchy->mother_id = $parentPartnerId;
      } else {
        $hierarchy->mother_id = $parent->id;
        $hierarchy->father_id = $parentPartnerId;
      }
      if(!$hierarchy->validate()) {
        throw new Exception(__FUNCTION__ . " > Hierarchy Validation fails");
      }
      if(!$hierarchy->save()) {
        throw new Exception(__FUNCTION__ . " > Hierarchy Save fails");
      }

      $transaction->commit();
    } catch (Exception $e) {
      Yii::log(print_r($e->getMessage(), true), 'debug');
      echo $e->getMessage();
      $transaction->rollback();
    }
  }

  public function actionAddChild() {
    $action = PersonController::ACTION_ADD_CHILD;
    $parentId = Util::get($_GET, "parentId");

    try {
      if($parentId == null) {
        throw new Exception(__FUNCTION__ . " > Parent ID is empty");
      }

      // get the parent from db
      $parent = Person::model()->findByPk($parentId);

      // render
      $this->render("add_person", array(
        "action" => $action,
        "parent" => $parent
      ));

    } catch (Exception $e) {
      Yii::log(print_r($e->getMessage(), true), 'debug');
      $this->redirect("/pedigree/tree");
    }
  }

  public function actionDetail() {
    $personId = Util::get($_GET, "id");
    $person = $this->getPersonInfoTranslated($personId);
    $this->render("detail", array(
      "person" => $person
    ));
  }

  public function actionGetPersonInfo() {
    $personId = Util::get($_GET, "personId");
    $person = $this->getPersonInfoTranslated($personId);

    if($person != null) {
      Util::returnJSON(array(
        "success" => true,
        "person" => $person
      ));
    } else {
      Util::returnJSON(array(
        "success" => false
      ));
    }
  }

  protected function getPersonInfoTranslated($personId) {
    try {
      // validation
      if($personId == null) {
        throw new Exception(__FUNCTION__ . " > Person Id is empty");
      }

      // get the person from database
      $person = Person::model()->find("id = :id", array(":id" => $personId));
      if($person == null) {
        throw new Exception(__FUNCTION__ . " > Cannot find person");
      }

      return $person->getInfoTranslated();
    } catch (Exception $e) {
      Yii::log(print_r(__FUNCTION__ . " > " . $e->getMessage(), true), 'error');
      return null;
    }
  }

	// Uncomment the following methods and override them if needed
	/*
	   public function filters()
	   {
		 // return the filter configuration for this controller, e.g.:
		 return array(
		 'inlineFilterName',
		 array(
		 'class'=>'path.to.FilterClass',
		 'propertyName'=>'propertyValue',
		 ),
		 );
	   }

	   public function actions()
	   {
		 // return external action classes, e.g.:
		 return array(
		 'action1'=>'path.to.ActionClass',
		 'action2'=>array(
		 'class'=>'path.to.AnotherActionClass',
		 'propertyName'=>'propertyValue',
		 ),
		 );
	   }
	 */
}
?>
