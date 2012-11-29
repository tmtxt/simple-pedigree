<?
class Util{
    public static function get($array, $key, $default = null) {
        return isset($array[$key]) ? $array[$key] : $default;
    }

    public static function supportedLanguages() {
        return self::get(Yii::app()->params, 'languages', array());
    }

    public static function isLanguageSupported($language) {
        return in_array($language, array_keys(self::supportedLanguages()));
    }

    public static function changeLanguage($language) {
        if (Util::isLanguageSupported($language)) {
            Yii::app()->session['language'] = $language;
            Yii::app()->language = $language;
        }
    }

}
?>
