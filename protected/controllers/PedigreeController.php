<?php

class PedigreeController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionTree() {
    $rootId = Util::get($_GET, "root");
    $this->render('tree', array(
      "rootId" => $rootId
    ));
  }

  public function actionGetTree() {
    $rootId = Util::get($_GET, "root");
    $tree = PedigreeUtil::getPedigreeTree($rootId);
    Util::returnJSON($tree);
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
