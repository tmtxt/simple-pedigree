<?php
class PedigreeUtil {
  // find the first pedigree in database, Return null if not exist
  public function findFirstPedigree() {
    $pedigree = Pedigree::model()->find();
    return $pedigree;
  }

  //
  public static function getPedigreeTree($rootId = null, $depth = null) {
    $sql = file_get_contents(__DIR__ . "/../query/find_descendants.sql");
    $result = Yii::app()->db->createCommand($sql)->queryALl();
    return $result;
  }
}
?>
