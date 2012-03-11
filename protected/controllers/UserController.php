<?php

class UserController extends Controller {
    const PAGE_SIZE = 10;

    /**
     * @var string specifies the default action 
     */
    public $defaultAction='admin';

    /**
     * @var CActiveRecord the currently loaded data model instance.
     */
    private $_user;

    /**
     * @return array action filters
     */
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
        return array(
            array('allow',  // all users
                'actions'=>array('create', 'confirm', 'welcome', 
                				'reset', 'resetThanks', 
                                'sendActivationEmail'),
                'users'=>array('*'),
            ),	
            array('allow', # logged in users
                    'actions'=>array('update', 'welcome', 'activationNeeded', 'changePassword'),
                    'users'=>array('@'),
                ),
            array('allow', # admins
                'actions'=>array('list', 'show', 'delete','admin'),
                'roles'=>array('admin'),
                'users'=>array('@'),
            ),
            array('deny',  // deny all users
                'users'=>array('*'),
            ),
        );
    }

    /**
     * Shows a particular user.
     */
    public function actionShow() {
        #if (Yii::app()->user->checkAccess('showUser')) {
        #}
        $this->render('show',array('user'=>$this->loadUser()));
    }

    /**
     * Creates a new user.
     * If creation is successful, the browser will be redirected to the 'show' page.
     */
    
    # Create new account 
    public function actionCreate() {
        $user = new User;
        $this->performAjaxValidation($user);
        if (isset($_POST['User'])) {
            $user->attributes = $_POST['User'];
            
            $attrs = $_POST['User'];
            $user->username = trim($attrs['username']);
            $user->email = trim($attrs['email']);
            $user->password = $attrs['password'];
            $user->password_repeat = $attrs['password_repeat'];
            $user->unique_id  = $user->generatePassword(20);

            $user->is_approved = 1;
            
            if ($user->validate('insert')) {
                $user->encryptPassword();

                if ($user->save(false)) {
                    # Create default objects for user here

                    $this->sendActivationEmail($user);

                    $this->redirect(array('welcome', 'id'=>$user->id));
                }
                else {
                    Yii::log(__FUNCTION__."> create failed", 'warning');
                }
            }
            else {
                Yii::log(__FUNCTION__."> validation failed", 'warning');
            }
        }
        $this->render('create', array('model'=>$user)) ;
    }

    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax']==='user-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    /**
     * Updates a particular user.
     * If update is successful, the browser will be redirected to the 'show' page.
     */
    public function actionUpdate() {
        $user = $this->loadUser();
        $this->performAjaxValidation($user);
        #if (!Yii::app()->user->checkAccess('updateOwnUser', array('user'=>$user))) {
        #    Yii::log(__FUNCTION__."> Unauthorized", 'debug');
        #    throw new CHttpException(403, 'You are not authorized to perform this action.');
        #}

        if (isset($_POST['User'])) {
            $user->attributes = $_POST['User'] ;
            $attrs = $_POST['User'];

            $password = $user->password_new = $attrs['password'];
            $user->password_repeat = $attrs['password_repeat'];

            if ($user->validate('update')) {
                if ($password != '') {
                    $user->encryptPassword();
                }

                if ($user->save(false)) {
                    Yii::app()->user->setFlash('notice', 'Updated');
                    $this->redirect(array('site/index'));
                }
                else {
                    Yii::log(__FUNCTION__."> Update failed", 'warning');
                }

            }
            else {
                Yii::log(__FUNCTION__."> validation failed", 'warning');
            }
        }
        $user->password = $user->password_repeat = '';
        $this->render('update', array('model'=>$user)) ;
    }

    /**
     * Deletes a particular user.
     * If deletion is successful, the browser will be redirected to the 'list' page.
     */
    public function actionDelete() {
        if (Yii::app()->request->isPostRequest) {
            # we only allow deletion via POST request
            $user = $this->loadUser();
            $auth = Yii::app()->authManager;
            $auth->revoke($user->getRoleName(), $user->username);
            $user->delete();
            $this->redirect(array('list'));
        }
        else {
            throw new CHttpException(500,'Invalid request. Please do not repeat this request again.');
        }
    }

    /**
     * Lists all users.
     */
    public function actionList() {
        $criteria = new CDbCriteria;

        $pages = new CPagination(User::model()->count($criteria));
        $pages->pageSize = self::PAGE_SIZE;
        $pages->applyLimit($criteria);

        $sort = new CSort('User');
        $sort->applyOrder($criteria);

        $userList = User::model()->findAll($criteria);

        $this->render('list',array(
            'userList'=>$userList,
            'pages'=>$pages,
            'sort'=>$sort,
        ));
    }

    /**
     * Manages all users.
     */
    public function actionAdmin() {
        $this->processAdminCommand();

        $criteria = new CDbCriteria;

        $pages = new CPagination(User::model()->count($criteria));
        $pages->pageSize=self::PAGE_SIZE;
        $pages->applyLimit($criteria);

        $sort = new CSort('User');
        $sort->applyOrder($criteria);

        $userList = User::model()->findAll($criteria);

        $this->render('admin',array(
            'userList'=>$userList,
            'pages'=>$pages,
            'sort'=>$sort,
        ));
    }
    
    # Confirm email works
	public function actionConfirm() {
		$key = $_GET['key'] ;
		User::model()->updateAll(array('is_activated'=>1),'unique_id=:unique_id', array(':unique_id'=>$key));

        $user = User::model()->findByAttributes(array('unique_id' => $key));
        if (!$user->is_approved) {
            $this->sendNotificationEmail($user);
        }

		$this->render('confirm', array('user'=>$user));
	}

    public function actionWelcome() {
        $this->render('welcome', array('user'=>$this->loadUser())) ;
    }

    public function actionActivationNeeded() {
        $this->render('activationNeeded', array('user'=>$this->loadUser())) ;
    }
    
    # Look up user and reset password
    public function actionReset() {
    	$email='';   
        //$this->render('reset',array('user'=>$this->loadUser())) ;
        if (isset($_REQUEST["reset_user"])) {
            $reset_user = $_REQUEST["reset_user"];
            Yii::log("reset $reset_user", 'debug');
            $user = User::model()->findByAttributes(array('username' => $reset_user));
            if ($user !== null) {
                Yii::log(__FUNCTION__."> reset found user $reset_user", 'debug');
                $user->password = $user->generatePassword(8);
                $user->encryptPassword();

                if ($user->save()) {
                    $this->sendPasswordEmail($user);
                }
                else {
                    Yii::log(__FUNCTION__."> Error: could not save new user password", 'error');
                }
            }
            else {
                Yii::log(__FUNCTION__."> User account not found for user $reset_user", 'error');
            }
            $this->redirect(array('user/resetThanks'));
        }
        $this->render('reset', array('email'=>$email));
    }

    public function actionResetThanks() {
        $this->render('resetThanks');
    }
    
    # Reset password and send it to user in email
    public function actionLostPass() {
        $user = $this->loadUser();
        if (isset($_POST['User'])) {
            $user->attributes = $_POST['User'];
            $user->password = $user->generatePassword(8);
            $user->encryptPassword();

            if ($user->save()) {
                $this->sendPasswordEmail($user);
            }
            else {
                Yii::log("Error saving new user password", 'error');
            }
        }
        $this->render('lostpass', array('user'=>$user)) ;
    }
    
    # Change user password 
    public function actionChangePassword() {
        $user = $this->loadUser(Yii::app()->user->db_id); // only allows the current user
        if (isset($_POST['User'])) {
            $user->attributes=$_POST['User'];
            $user->encryptPassword();

            if ($user->save()) {
                $this->redirect(array('passwordChanged'));
            }
            else {
                Yii::log("password update failed", 'warning');
                #Yii::app()->user->setFlash('contact','Password update failed');
            }
        }
        $this->render('changePassword',array('user'=>$user));
    }

    public function actionPasswordChanged() {
        $this->render('passwordChanged') ;
    }
    
    # Send account activation email 
    private function sendActivationEmail($user) {
        $app_email_name = Yii::app()->params['app_email_name'];
        $app_email = Yii::app()->params['app_email'];
        $email_prefix = Yii::app()->params['email_prefix'];
        $headers = "From: $app_email_name <$app_email>\r\n"; //optional header fields
        ini_set('sendmail_from', $app_email); 

        $recipient = $user->email;
        $subject = $email_prefix . "Welcome to " . Yii::app()->name;
        $url = $this->createAbsoluteUrl('user/confirm', array('key' => $user->unique_id));
        $body = <<<EO_MAIL
Thanks for joining!

To confirm that your email works, please click on this link: 
$url

EO_MAIL;
        mail($recipient, $subject, $body, $headers); 
        Yii::log("Sent email to $recipient, $subject");
    }
    
    // Send password email 
    private function sendPasswordEmail($user) {
        $app_email_name = Yii::app()->params['app_email_name'];
        $app_email = Yii::app()->params['app_email'];
        $email_prefix = Yii::app()->params['email_prefix'];
        $headers = "From: $app_email_name <$app_email>\r\n"; //optional header fields
        ini_set('sendmail_from', $app_email); 
    
        $recipient = $user->email;
        $subject = $email_prefix . "Password reset"; 
        $password_unhashed = $user->passwordUnHashed; 
        $url = $this->createAbsoluteUrl('site/login');
        $body = <<<EO_MAIL
Password reset

We have reset your password to $password_unhashed

Please login and change your password:
$url
EO_MAIL;
        mail($recipient, $subject, $body, $headers); 
        Yii::log(__FUNCTION__."> Sent email to $recipient, $subject");
    }
    
    public function actionSendActivationEmail() {
        $user = $this->loadUser();
        Yii::log(__FUNCTION__."> Sending activation email to user ". $user->email, 'debug');
        $this->sendActivationEmail($user);
        $this->render('activationNeeded', array('user'=>$user));
    }
    
    # Send notification email to admins about new user
    private function sendNotificationEmail($user) {
        $app_email_name = Yii::app()->params['app_email_name'];
        $app_email = Yii::app()->params['app_email'];
        $email_prefix = Yii::app()->params['email_prefix'];
        $headers = "From: $app_email_name <$app_email>\r\n"; //optional header fields
        ini_set('sendmail_from', $app_email); 

        $recipient = Yii::app()->params['notify_email'];
        $subject = $email_prefix . "New user registration";
        $url = $this->createAbsoluteUrl('user/show', array('id'=>$user->id));
        $body = <<<EO_MAIL
New user registration
Email: {$user->email}
Name:  {$user->name}
Phone: {$user->phone}

$url

EO_MAIL;
        mail($recipient, $subject, $body, $headers); 
        Yii::log(__FUNCTION__."> Sent email to $recipient, $subject");
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer the primary key value. Defaults to null, meaning using the 'id' GET variable
     */
    private function loadUser($id=null) {
        if ($this->_user===null) {
            if ($id!==null || isset($_GET['id'])) {
                $this->_user=User::model()->findbyPk($id!==null ? $id : $_GET['id']) ;
            }
            if ($this->_user===null)
                throw new CHttpException(500,'The requested user does not exist.') ;
        }
        return $this->_user ;
    }

    # Like loadUser, but expects unique_id in id field
    private function loadUserByUnique($id=null) {
        if ($this->_user===null) {
            if ($id!==null || isset($_GET['id'])) {
                #$this->_user=User::model()->findbyPk($id!==null ? $id : $_GET['id']) ;
                $value = $id!==null ? $id : $_GET['id'];
                $this->_user=User::model()->findByAttributes(array('unique_id' => $value));
            }
            if ($this->_user===null)
                throw new CHttpException(500,'The requested user does not exist.');
        }
        return $this->_user;
    }

    /**
     * Executes any command triggered on the admin page.
     */
    protected function processAdminCommand() {
        if (isset($_POST['command'], $_POST['id']) && $_POST['command']==='delete') {
            $this->loadUser($_POST['id'])->delete();
            // reload the current page to avoid duplicated delete actions
            $this->refresh();
        }
    }
}


