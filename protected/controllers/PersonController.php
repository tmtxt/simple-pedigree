<?php

class PersonController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionAddChild() {
    $this->render("add_child");
  }

  public function actionDetail() {
    $personId = Util::get($_GET, "id");

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

      $this->render("detail", array(
        "person" => $person->getInfoTranslated()
      ));
    } catch (Exception $e) {
      Yii::log(print_r(__FUNCTION__ . " > " . $e->getMessage(), true), 'error');
      $this->render("detail", array(
        "person" => null
      ));
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
