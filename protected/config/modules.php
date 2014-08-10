<?php
# Override module configuration
return array(
    'modules' => array(
       'gii'=>array(
            'class'=>'system.gii.GiiModule',
            'generatorPaths'=>array(
                'bootstrap.gii',
            ),
            'password'=>'1234',
            'ipFilters'=>array('*.*.*.*')
        ),
        'instructor',
    )
);
?>
