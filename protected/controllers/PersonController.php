<?php

class PersonController extends Controller
{
  const ACTION_ADD_CHILD = 1;

	public function actionIndex()
	{
		$this->render('index');
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
