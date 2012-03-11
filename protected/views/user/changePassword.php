<h2>Change Password</h2>

<div class="yiiForm">

<?= CHtml::form() ?>
<?= CHtml::errorSummary($user); ?>

<div class="simple">
<?= CHtml::activeLabelEx($user, 'Password'); ?>
<?= CHtml::activePasswordField($user, 'password'); ?>
</div>

<div class="simple">
<?= CHtml::activeLabelEx($user,'Confirm Password'); ?>
<?= CHtml::activePasswordField($user,'password_repeat'); ?>
</div>

<div class="action">
  <?= CHtml::submitButton('Save'); ?>
</div>

</form>
</div><!-- yiiForm -->
