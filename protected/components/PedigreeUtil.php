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

    // get the pedigree tree from this root
    $query =  PedigreeUtil::queryPedigreeTree($rootId, $depth);

    // construct the tree
    $tree = PedigreeUtil::constructTree($query, $firstPedigree->root);
    return $tree;
  }

  // query the pedigree tree from db using the sql in find_descendants.sql
  protected static function queryPedigreeTree($rootId, $depth = null) {
    // query
    $sql = Util::readQuery("find_descendants");
    $command = Yii::app()->db->createCommand();
    $command->text = $sql;
    $command->params = array(
      ":root_id" => $rootId
    );
    $result = $command->queryAll();
    return $result;
  }

  protected static function constructTree($query, $root) {
    // the tree is an associative array (just like json object)
    $tree = array();
    $tree["name"] = $root->name;
    $tree["id"] = $root->id;
    $tree["children"] = array();

    foreach($query as $result) {
      // create a new person
      $person = array();
      $person["name"] = $result["name"];
      $person["id"] = $result["id"];
      $tree = PedigreeUtil::appendChild($tree, $result["path"], $person);
    }

    return $tree;
  }

  protected static function appendChild($tree, $path, $person) {
    $parent = $tree;
    for($i = 1; $i < count($path); $i++) {
      $parent = $parent->children[$path[$i]];
    }
    $parent["children"][$person["id"]] = $person;
    return $parent;
  }
}
?>
