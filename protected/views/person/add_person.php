<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<h1>Add Child</h1>

<form action="">
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label><?= Yii::t('app', 'Full Name') ?></label>
        <input type="text" class="form-control" placeholder="<?= Yii::t('app', 'Enter Full Name') ?>">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Birth Date') ?></label>
        <input type="text" class="form-control" data-provide="datepicker" data-date-autoclose="true">
      </div>

      <div class="form-group js-alive-status-div">
        <label><?= Yii::t('app', 'Alive Status') ?></label>
        <?php
        echo CHtml::dropDownList("alive_status", null,
                                 Person::getAliveStatuses(),
                                 array("class" => "form-control js-alive-status-select"));
        ?>
      </div>

      <div class="form-group js-death-date-div">
        <label><?= Yii::t('app', 'Death Date') ?></label>
        <input type="text" class="form-control" data-provide="datepicker" data-date-autoclose="true">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Job') ?></label>
        <input type="text" class="form-control">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Address') ?></label>
        <textarea class="form-control" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Gender') ?></label>
        <?php
        echo CHtml::dropDownList("gender", null,
                                 Person::getAliveStatuses(),
                                 array("class" => "form-control"));
        ?>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Phone No') ?></label>
        <input type="text" class="form-control">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'History') ?></label>
        <textarea class="form-control" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Other Information') ?></label>
        <textarea class="form-control" rows="4"></textarea>
      </div>

    </div>
    <div class="col-md-6">
      <input class="btn btn-success" type="submit" value="Insert"/>
    </div>
  </div>
</form>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/person-add_child.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/person-add_person/main.js", CClientScript::POS_END);
?>
