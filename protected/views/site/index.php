<?php
$clientScript = Yii::app()->clientScript;

$clientScript->registerCssFile('/client/dist/stylesheet/pages/index.css');

$this->pageTitle = Yii::app()->name ?>

<h1><?=Yii::t('app' , 'Welcome' ) ?> <?= CHtml::encode(Yii::app()->name) ?></h1>

