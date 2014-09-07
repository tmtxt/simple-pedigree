<?php

class PedigreeController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionTree() {
    $this->render('tree');
  }

  public function actionGetTree() {
    $tree = PedigreeUtil::getPedigreeTree();
    Util::returnJSON($tree);
  }

  public function actionGetPersonInfo() {
    $personId = Util::get($_GET, "personId");

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

      Util::returnJSON(array(
        "success" => true,
        "person" => array(
          "id" => $person->id,
          "name" => $person->name,
          "aliveStatus" => Person::getAliveStatus($person->alive_status)
        )
      ));
    } catch (Exception $e) {
      Yii::log(print_r(__FUNCTION__ . " > " . $e->getMessage(), true), 'error');
      Util::returnJSON(array(
        "success" => false
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
