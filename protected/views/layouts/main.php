<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/client/dist/assets/favicon.ico">

    <title><?php echo CHtml::encode($this->pageTitle); ?></title>

    <!-- Core JS & IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <?php
    $clientScript = Yii::app()->clientScript;
    $clientScript->registerCssFile("/client/dist/stylesheet/commons/common.css");
    $clientScript->registerScriptFile('/client/dist/javascript/libs/libs.js', CClientScript::POS_HEAD);
    $clientScript->registerScriptFile('/client/dist/javascript/share/share.js', CClientScript::POS_END);
    ?>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav id="mainNav" role="navigation">
      <div class="navbar-header">

        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".collapsableNavbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div> <!-- End Navbar Header -->

      <div class="collapsableNavbar collapse">
        <ul class="navbarContent">
          <li class="active"><a href="/instructor/course"><?=Yii::t('app' , 'Pedigree')?></a></li>
        </ul> <!-- End Left Navbar -->
        <div id="logo">
          <a href="#"><img src="/client/assets/img/we-logo.png" alt="Simple Pedigree"></a>
        </div><!-- End logo -->
        <ul class="navbarContent navbar-right">
          <?php if(!Yii::app()->user->isGuest) { ?>
            <?php $user = User::model()->findByPk(Yii::app()->user->_id) ?>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><?= $user->name ?><span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="/site/logout"><i class="logoutIcon"></i> <?= Yii::t('app', 'Logout')?></a></li>
              </ul>
            </li>
          <?php } else { ?>
          <li><a href="/site/login"><?= Yii::t('app', 'Login');?></a></li>
          <?php } ?>
          <li><a href="/site/changeLanguage/lang/en">English</a></li>
          <li><a href="/site/changeLanguage/lang/vn">Vietnamese</a></li>
        </ul> <!-- End navbar content -->
      </div> <!-- End Navbar-Collapse -->

    </nav><!-- Main Navbar -->

    <?php
    foreach(Yii::app()->user->getFlashes() as $key => $message) {
        echo '<div class="fade-in alert-dismissable alert alert-' . $key . '"> <a class="close" data-dismiss="alert" href="#">×</a>' . $message . "</div>\n";
    }
    ?>

    <?php echo $content; ?>

    <footer>
      <p>Copyright &copy; <?php echo date('Y'); ?> by TruongTx. All rights reserved.</p>
    </footer><!-- End Footer -->

    <?php if (Yii::app()->params['csync_enable']) { ?>
      <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
    <?php } ?>

  </body>
</html>
