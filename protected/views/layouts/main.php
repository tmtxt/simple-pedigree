<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

    <?$clientScript = Yii::app()->clientScript;
    $clientScript->registerScriptFile('/js/jquery-1.8.3.min.js');?>
    <?Yii::app()->clientScript->registerScriptFile('/js/bootstrap.js');?>
	<!-- blueprint CSS framework -->
    <?$clientScript->registerCssFile('/css/screen.css' , 'screen, projection');
    $clientScript->registerCssFile('/css/print.css' , 'print');?>
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
	<![endif]-->

    <?$clientScript->registerCssFile('/css/bootstrap.min.css');
    $clientScript->registerCssFile('/css/main.css');
    $clientScript->registerCssFile('/css/form.css');?>

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

<div class="container" id="page">

	<div id="header">
		<div id="logo"><?php echo CHtml::encode(Yii::app()->name); ?></div>
        <div id='language'> <a href='/site/changeLanguage/lang/en'>EN</a> | <a href='/site/changeLanguage/lang/zh_tw'>TW</a></div>
	</div><!-- header -->

	<div id="mainmenu">
		<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Home', 'url'=>array('/site/index')),
				array('label'=>'About', 'url'=>array('/site/page', 'view'=>'about')),
				array('label'=>'Contact', 'url'=>array('/site/contact')),
				array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
		)); ?>
	</div><!-- mainmenu -->
	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>

	<div id="footer">
		Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
		All Rights Reserved.<br/>
		<?php echo Yii::powered(); ?>
	</div><!-- footer -->

</div><!-- page -->

<?php if (Yii::app()->params['csync_enable']) { ?>
    <script>
        var css_sync = {
            "config": {
                "port": <?= Yii::app()->params['csync_port'] ?>
            }
        };
    </script>
    <script src="/css-sync/css-reload.js"></script>
<?php } ?>

</body>
</html>
