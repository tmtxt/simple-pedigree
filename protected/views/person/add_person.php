<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>
<?php
if($action == PersonController::ACTION_ADD_CHILD) {
?>
  <h1>
    <?= Yii::t('app', 'Add child for ') ?>
    "<?= $parent->name ?>"
  </h1>
<?php
} else {
$this->redirect("/pedigree/tree");
}
?>

<form action="">
  <div class="row">
    <div class="col-md-6">
      <?php if($action == PersonController::ACTION_ADD_CHILD) {
              if($parent->marriagesCount == 0) { ?>
        <div class="form-group">
          <label>
            "<?= $parent->name ?>"
            <?= Yii::t('app', 'has no information about marriage.') ?>
          </label>
        </div>
      <?php } else { ?>
        <div class="form-group">
          <label>
            <?= Yii::t('app', 'Select Marriage') ?>
          </label>
          <select class="form-control js-marriage-select">
            <?php foreach($parent->marriagesHusband as $marriage) { ?>
              <option
                data-image="<?= $marriage->wife->getPictureUrlSmall($marriage->wife->picture) ?>"
                value="<?= $marriage->wife->id ?>">
                <?= $marriage->wife->name ?>
              </option>
            <?php } ?>
            <?php foreach($parent->marriagesWife as $marriage) { ?>
              <option
                data-image="<?= $marriage->husband->getPictureUrlSmall($marriage->husband->picture) ?>"
                value="<?= $marriage->husband->id ?>">
                <?= $marriage->husband->name ?>
              </option>
            <?php } ?>
          </select>
        </div>
      <?php }
      }
      ?>

      <div class="form-group">
        <label><?= Yii::t('app', 'Full Name') ?></label>
        <input type="text" class="form-control" placeholder="<?= Yii::t('app', 'Enter Full Name') ?>">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Birth Date') ?></label>
        <input type="text" class="form-control js-birth-date-input">
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
        <input type="text" class="form-control js-death-date-input">
      </div>
    </div>

    <div class="col-md-6">
      <div class="form-group">
        <label><?= Yii::t('app', 'Job') ?></label>
        <input type="text" class="form-control" placeholder="<?= Yii::t('app', 'Enter Job') ?>">
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
        <input type="text" class="form-control" placeholder="<?= Yii::t('app', 'Enter Phone Number') ?>">
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label><?= Yii::t('app', 'History') ?></label>
        <textarea class="form-control" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Other Information') ?></label>
        <textarea class="form-control" rows="4"></textarea>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 text-right">
      <input type="submit" value="Insert" class="btn btn-primary">
    </div>
  </div>
</form>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/person-add_child.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/person-add_person/main.js", CClientScript::POS_END);
?>
