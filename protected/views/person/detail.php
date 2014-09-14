<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Person Detail</h1>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/person-detail.css');

if($person != null) {
  $personJson = CJSON::encode($person);
  $personScript = <<<EO_SCRIPT
    window.person = $personJson;
EO_SCRIPT;
  $clientScript->registerScript("personScript", $personScript, CClientScript::POS_HEAD);
}
?>
