<?php

$pre_config = require(dirname(__FILE__).'/local.php');

// Location where user images are stored
//Yii::setPathOfAlias('uploadPath', realpath(dirname(__FILE__). '/../../images/uploads'));
//Yii::setPathOfAlias('uploadURL', '/images/uploads/');

return CMap::mergeArray(array(
    'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
    'name'=>'Music',

    'preload'=>array('log'),

    'import'=>array(
        'application.models.*',
        'application.components.*',
        'application.behaviors.*',
        'application.vendors.*',
        'application.helpers.*',
    ),

    'components'=>array(
        'cache' => array(
            'class' => 'system.caching.CFileCache'
        ),
        'session' => array(
            'class' => 'system.web.CDbHttpSession',
            'connectionID' => 'db',
            'timeout' => 3600,
        ),
        'errorHandler'=>array(
            'errorAction'=>'site/error',
        ),
        'urlManager'=>array(
            'urlFormat'=>'path',
            'showScriptName'=>false,
            'rules'=>array(
                //'search/<search:.+>'=>'site/index',
                //'search'=>'site/index',
                //'download/<search:.+>'=>'site/index',
                //'download'=>'site/index',
                //'.*'=>'site/index',
            ),
        ),
        'log'=>array(
            'class'=>'CLogRouter',
            'routes'=>array(
                array(
                    'class'=>'CFileLogRoute',
                    'levels'=>'error, warning, info, debug',
                ),
                //array(
                //    'class'=>'CWebLogRoute',
                //),
            ),
        ),
        'messages'=>array(
            'class'=>'CPhpMessageSource',
        ),
        'user'=>array(
            // enable cookie-based authentication
            'allowAutoLogin'=>true,
        ),
        'authManager'=>array(
            'class'=>'CDbAuthManager',
            'connectionID'=>'db',
        ),
    ),

    'params' => array(
        // date formats
        'js_date_format' => 'dd-mm-yy',
        'db_date_format' => "%Y-%m-%d",
        'display_date_format' => "%d-%m-%Y",
        'display_short_date_format' => "%d-%m", 
   ),
), $pre_config);

