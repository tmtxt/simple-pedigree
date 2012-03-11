<?php

class UserIdentity extends CUserIdentity {

    public $_id;

	public function authenticate() {
        $user = User::model()->findByAttributes(array('userid'=>$this->username));

        if ($user===null)
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        else if(md5($this->password) !== $user->password)
            $this->errorCode=self::ERROR_PASSWORD_INVALID;
        else {
            $this->_id = $user->id;
            $this->username = $user->userid;
            $this->errorCode = self::ERROR_NONE;
            $this->setState("_id", $user->id);
         }
        return !$this->errorCode;
	}

}
