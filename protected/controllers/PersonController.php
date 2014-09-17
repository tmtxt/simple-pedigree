<?php

class PersonController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionAddChild() {
    $this->render("add_person");
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
