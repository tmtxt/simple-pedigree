<?php
class PedigreeUtil {
  // find the first pedigree in database, Return null if not exist
  public static function findFirstPedigree() {
    $pedigree = Pedigree::model()->find();
    return $pedigree;
  }

  //
  public static function getPedigreeTree($rootId = null, $depth = null) {
    // check root id
    if($rootId == null) {
      $firstPedigree = PedigreeUtil::findFirstPedigree();
      if($firstPedigree == null) {
        return null;
      }
      $rootId = $firstPedigree->root_id;
    }

    $sql = Util::readQuery("find_descendants");
    $command = Yii::app()->db->createCommand();
    $command->text = $sql;
    $command->params = array(
      ":root_id" => $rootId
    );
    $result = $command->queryAll();
    return $result;
  }
}
?>
