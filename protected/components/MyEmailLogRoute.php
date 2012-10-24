<?php

class MyEmailLogRoute extends CEmailLogRoute {

    public function getSubject() {
        $url_length = 40;
        $request_uri = $_SERVER['REQUEST_URI'];
        if (strlen($request_uri) > ($url_length + 3)) {
            $request_uri = substr($request_uri, 0, $url_length) . '...';
        }
        return parent::getSubject() . ': ' .  $request_uri;
    }
}
