<? $this->pageTitle = Yii::app()->name . ' - Welcome' ?>

<?php
////////////////////////////////////////////////////////////////////////////////
// HEADING TEXT
if($action == PersonController::ACTION_ADD_CHILD) {
?>
  <h1>
    <?= Yii::t('app', 'Add child for ') ?>
    "<?= $parent->name ?>"
  </h1>
<?php

} else if($action == PersonController::ACTION_ADD_MARRIAGE) {
?>
  <h1>
    <?= Yii::t('app', 'Add marriage for ') ?>
    "<?= $person->name ?>"
  </h1>
<?php
} else if($action == PersonController::ACTION_EDIT) {
?>
  <h1>
    <?= Yii::t('app', 'Edit information for ') ?>
    "<?= $person->name ?>"
  </h1>
<?php
} else {
$this->redirect("/pedigree/tree");
}
?>

<form
  <?php
  //////////////////////////////////////////////////////////////////////////////
  // FORM ACTION TARGET BASED ON $action
  if($action == PersonController::ACTION_ADD_CHILD) {
  ?>
    action="/person/addChildProcess"
  <?php
  } else if($action == PersonController::ACTION_ADD_MARRIAGE) {
  ?>
    action="/person/addMarriageProcess"
  <?php
  } else if($action == PersonController::ACTION_EDIT) {
  ?>
    action="/person/editProcess"
  <?php
  }
  ?>
       enctype="multipart/form-data"
  method="POST">

  <?php ////////////////////////////////////////////////////////////////////// ?>
  <?php // BEGIN FORM CONTENT ?>
  <div class="row">
    <div class="col-md-6">
      <?php ///////////////////////////////////////////////////////////////// ?>
      <?php // Display parent selection if $action is ADD CHILD ?>
      <?php if($action == PersonController::ACTION_ADD_CHILD) {
      ?>
        <input type="hidden" name="parent-id" value="<?= $parent->id ?>">
        <?php
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
              <?= Yii::t('app', 'Select parent') ?>
            </label>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-3">
                    <img src="<?= $parent->getPictureUrlSmall($parent->picture) ?>" class="img-responsive" />
                  </div>
                  <div class="col-md-9">
                    <?= $parent->name ?>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <select name="parent-partner-id" class="form-control js-marriage-select">
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
            </div>
          </div>
        <?php }

        /////////////////////////////////////////////////////////////////
        // If $action is ADD MARRIAGE, just a hidden input to store the partner id
        } else if($action == PersonController::ACTION_ADD_MARRIAGE) {
        ?>
          <input type="hidden" name="partner-id" value="<?= $person->id ?>">
        <?php
        }
        ?>

        <?php ///////////////////////////////////////////////////////////////// ?>
        <?php // Begin Form control ?>
        <div class="form-group">
          <label><?= Yii::t('app', 'Full Name') ?></label>
          <input type="text" class="form-control" name="name"
          <?= $action == PersonController::ACTION_EDIT ? 'value="' . $person->name . '"' : '' ?>
                 placeholder="<?= Yii::t('app', 'Enter Full Name') ?>">
        </div>

        <div class="form-group">
          <label><?= Yii::t('app', 'Birth Date') ?></label>
          <input type="text" class="form-control js-birth-date-input"
          <?= $action == PersonController::ACTION_EDIT ? 'value="' . $person->getBirthDate() . '"' : '' ?>
                 name="birth-date">
        </div>

        <div class="form-group js-alive-status-div">
          <label><?= Yii::t('app', 'Alive Status') ?></label>
          <?php
          echo CHtml::dropDownList("alive-status",
                                   $action == PersonController::ACTION_EDIT ? $person->getAliveStatus() : "",
                                   Person::getAliveStatuses(),
                                   array("class" => "form-control js-alive-status-select"));
          ?>
        </div>

        <div class="form-group js-death-date-div">
          <label><?= Yii::t('app', 'Death Date') ?></label>
          <input type="text" class="form-control js-death-date-input"
          <?= $action == PersonController::ACTION_EDIT ? 'value="' . $person->getDeathDate() . '"' : '' ?>
                 name="death-date">
        </div>

        <div class="form-group">
          <label><?= Yii::t('app', 'Picture') ?></label>
          <?php
          if($action == PersonController::ACTION_EDIT) {
          ?>
            <div class="row">
              <div class="col-md-2">
                <img src="<?= $person->getPictureUrlSmall($person->picture) ?>" class="img-responsive" />
              </div>
              <div class="col-md-10">
                <input type="file" name="picture" enctype="multipart/form-data">
              </div>
            </div>
          <?php
          } else {
          ?>
            <input type="file" name="picture" enctype="multipart/form-data">
          <?php
          }
          ?>
        </div>
    </div>

    <div class="col-md-6">
      <div class="form-group">
        <label><?= Yii::t('app', 'Job') ?></label>
        <input type="text" class="form-control" name="job"
        <?= $action == PersonController::ACTION_EDIT ? 'value="' . $person->job . '"' : '' ?>
               placeholder="<?= Yii::t('app', 'Enter Job') ?>">
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Address') ?></label>
        <textarea class="form-control" rows="4" name="address"><?= $action == PersonController::ACTION_EDIT ? $person->address : '' ?></textarea>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Gender') ?></label>
        <?php
        echo CHtml::dropDownList("gender",
                                 $action == PersonController::ACTION_EDIT ? $person->getGender() : "",
                                 Person::getGenders(),
                                 array("class" => "form-control"));
        ?>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Phone No') ?></label>
        <input type="text" class="form-control" name="phone-no"
        <?= $action == PersonController::ACTION_EDIT ? 'value="' . $person->phone_no . '"' : '' ?>
               placeholder="<?= Yii::t('app', 'Enter Phone Number') ?>">
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label><?= Yii::t('app', 'History') ?></label>
        <textarea class="form-control" rows="4" name="history"><?= $action == PersonController::ACTION_EDIT ? $person->history : '' ?></textarea>
      </div>

      <div class="form-group">
        <label><?= Yii::t('app', 'Other Information') ?></label>
        <textarea class="form-control" rows="4" name="other-information"><?= $action == PersonController::ACTION_EDIT ? $person->other_information : '' ?></textarea>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 text-right">
      <input type="submit"
      <?php
      if($action == PersonController::ACTION_ADD_CHILD || $action == PersonController::ACTION_ADD_MARRIAGE) {
        echo 'value="' . Yii::t('app', 'Insert Person') . '"';
      } else if($action == PersonController::ACTION_EDIT) {
        echo 'value="' . Yii::t('app', 'Update Info') . '"';
      }
      ?>
             class="btn btn-primary">
    </div>
  </div>
</form>

<?php
$clientScript = Yii::app()->clientScript;
$clientScript->registerCssFile('/client/dist/stylesheet/pages/person-add_child.css');
$clientScript->registerScriptFile("/client/dist/javascript/pages/person-add_person/main.js", CClientScript::POS_END);
?>
