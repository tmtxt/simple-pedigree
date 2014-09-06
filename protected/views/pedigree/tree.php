<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Tree</h1>

<div class="control">
  <div class="checkbox">
    <label>
      <input class="js-enable-zoom" type="checkbox">Enable Zoom
    </label>
  </div>
</div>

<div id="js-tree-container">
</div>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/pedigree_tree.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/pedigree_tree/main.js",
                                  CClientScript::POS_END);
?>
