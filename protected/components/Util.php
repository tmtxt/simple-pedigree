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

  public static function returnJSON($data) {
    header('Content-type: application/json');
    echo CJSON::encode($data);
    ob_start();
    Yii::app()->end(0, false);
    ob_end_clean();
    exit(0);
  }

  // read the query in file, input is the file name not include .sql extension
  public static function readQuery($name) {
    return file_get_contents(__DIR__ . "/../query/" . $name . ".sql");
  }

}
?>
