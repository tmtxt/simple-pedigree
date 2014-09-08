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
    $root = null;
    if($rootId == null) {
      $firstPedigree = PedigreeUtil::findFirstPedigree();
      if($firstPedigree == null) {
        return null;
      }
      $rootId = $firstPedigree->root_id;
      $root = $firstPedigree->root;
    } else {
      $root = Person::model()->find("id = :id", array(":id" => $rootId));
      if($root == null) {
        return null;
      }
    }

    // get the pedigree tree from this root
    $query =  PedigreeUtil::queryPedigreeTree($rootId, $depth);

    // construct the tree
    $tree = PedigreeUtil::constructTreeIndexed($query, $root);
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

  // construct the tree with the children of each person is an associative array
  protected static function constructTreeAssociative($query, $root) {
    // the tree is an associative array (just like json object)
    $tree = array();
    $tree["name"] = $root->name;
    $tree["id"] = $root->id;
    $tree["picture"] = empty($root->picture) ? Person::getPersonPicture($root->gender) : Person::getPictureUrlSmall($root->picture);
    $tree["marriages"] = $root->getMarriages();
    $tree["children"] = array();

    foreach($query as $result) {
      // create a new person
      $person = array();
      $person["name"] = $result["name"];
      $person["id"] = $result["id"];
      $person["picture"] = empty($result["picture"]) ? Person::getPersonPicture($result["gender"]) : Person::getPictureUrlSmall($result["picture"]);
      // person marriages
      $marriageIds = explode(",", $result["marriage_ids"]);
      $marriageNames = explode(",", $result["marriage_names"]);
      $marriagePictures = explode(",", $result["marriage_pictures"]);
      $marriageGenders = explode(",", $result["marriage_genders"]);
      $marriages = array();
      for($i = 0; $i< count($marriageIds); $i++) {
        array_push($marriages, array(
          "id" => $marriageIds[$i],
          "name" => $marriageNames[$i],
          "picture" => empty($marriagePictures[$i]) ? Person::getPersonPicture($marriageGenders[$i]) : Person::getPictureUrlSmall($marriagePictures[$i])
        ));
      }
      $person["marriages"] = $marriages;
      $person["children"] = array();
      PedigreeUtil::appendChild($tree, $result["path"], $person);
    }

    return $tree;
  }

  // construct the tree with the children of each person is an indexed array
  protected static function constructTreeIndexed($query, $root) {
    $tree = PedigreeUtil::constructTreeAssociative($query, $root);
    PedigreeUtil::childrenToArray($tree);
    return $tree;
  }

  // recursive
  protected static function childrenToArray(&$tree) {
    // convert from associative array to indexed array
    $tree["children"] = array_values($tree["children"]);

    // and then recursively convert its children
    for($i = 0; $i < count($tree["children"]); $i++) {
      PedigreeUtil::childrenToArray($tree["children"][$i]);
    }
  }

  protected static function appendChild(&$tree, $path, $person) {
    $parent = &$tree;
    $path = explode(",", $path);
    for($i = 1; $i < count($path); $i++) {
      $parent = &$parent["children"][$path[$i]];
    }
    $parent["children"][$person["id"]] = $person;
  }
}
?>
