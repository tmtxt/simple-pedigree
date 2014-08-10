<?php

class SiteController extends Controller {
    /**
 	 * Declares class-based actions.
	 */
	public function actions() {
		return array(
			# captcha action renders the CAPTCHA image displayed on the contact page
			#'captcha'=>array(
			#	'class'=>'CCaptchaAction',
			#	'backColor'=>0xFFFFFF,
			#),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex() {
	    #if (Yii::app()->user->isGuest) {
        #    $this->render('index');
        #} else {
        #    if (Yii::app()->user->checkAccess('admin')) {
        #        $this->redirect(array('admin/index'));
        #    } else {
        #        $this->redirect(array('user/accountBalance', 'id'=>Yii::app()->user->_id));
        #    }
	    #}
        $this->render('index');
	}
    public function actionChangeLanguage() {
        /* Change the session's language if the requested language is
         * supported */
        Util::changeLanguage(Util::get($_GET, 'lang'));

        /* Return to the previous page */
        $returnUrl = Yii::app()->request->urlReferrer;
        if (!$returnUrl)
            $returnUrl = '/';
        $this->redirect($returnUrl);
    }


	private function loadUser() {
	  return User::model()->findbyPk(Yii::app()->user->_id);
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError() {
	    if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest) {
	    		echo $error['message'];
            }
	    	else {
	        	$this->render('error', $error);
            }
	    }
	}

}
