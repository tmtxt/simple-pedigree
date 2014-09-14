<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Person Detail</h1>

<div id="js-info-container">

</div>

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

$clientScript->registerScriptFile("/client/dist/javascript/pages/person-detail/main.js", CClientScript::POS_END);
?>
