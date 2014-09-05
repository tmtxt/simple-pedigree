<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Tree</h1>

<div id="js-tree-content">
</div>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/pedigree_tree.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/pedigree_tree/main.js",
                                  CClientScript::POS_END);
?>
