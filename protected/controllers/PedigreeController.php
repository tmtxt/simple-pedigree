<?php

class PedigreeController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

  public function actionTree() {
    Yii::log(print_r(__DIR__, true), 'debug');
    $this->render('tree');
  }

  public function actionGetTree() {
    $tree = PedigreeUtil::getPedigreeTree();
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
