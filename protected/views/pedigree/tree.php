<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Tree</h1>

<div class="control">
  <label>
    <input class="js-enable-zoom" type="checkbox">Enable Zoom
  </label>

  <label>
    <button class="js-reset-zoom">
      Reset Zoom
    </button>
  </label>

  <label>
    <input class="js-enable-marriage" type="checkbox">Enable Marriage
  </label>
</div>

<div id="js-tree-container">
</div>

<div id="js-person-info-modal">

</div>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/pedigree-tree.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/pedigree-tree/main.js",
                                  CClientScript::POS_END);

if($rootId == null) {

} else {
  $utilScript = <<<EO_SCRIPT
  window.rootId = $rootId;
EO_SCRIPT;
  $clientScript->registerScript("utilScript", $utilScript, CClientScript::POS_HEAD);
}
?>
