<?php

/**
 * This is the model class for table "person".
 *
 * The followings are the available columns in table 'person':
 * @property integer $id
 * @property string $name
 * @property string $birth_date
 * @property string $death_date
 * @property integer $alive_status
 * @property string $job
 * @property string $address
 * @property string $picture
 * @property integer $gender
 * @property string $phone_no
 * @property string $id_card
 * @property string $history
 * @property string $other_information
 *
 * The followings are the available model relations:
 * @property Marriage[] $marriages
 * @property Marriage[] $marriages1
 * @property Pedigree[] $pedigrees
 * @property Hierarchy[] $hierarchies
 * @property Hierarchy[] $hierarchies1
 * @property Hierarchy[] $hierarchies2
 */
class Person extends CActiveRecord
{
  const ALIVE_STATUS_ALIVE = 0;
  const ALIVE_STATUS_DEATH = 1;
  const ALIVE_STATUS_UNKNOWN = 2;

  public static function getAliveStatuses() {
    return array(
      Person::ALIVE_STATUS_ALIVE => Yii::t('app', 'Alive'),
      Person::ALIVE_STATUS_DEATH => Yii::t('app', 'Death'),
      Person::ALIVE_STATUS_UNKNOWN => Yii::t('app', 'Unknown')
    );
  }

  protected function getAliveStatus() {
    $statuses = $this->getAliveStatuses();
    return Util::get($statuses, $this->alive_status, $statuses[Person::ALIVE_STATUS_UNKNOWN]);
  }

  const GENDER_UNKNOWN = 0;
  const GENDER_MALE = 1;
  const GENDER_FEMALE = 2;
  const GENDER_GAY = 3;
  const GENDER_LESBIAN = 4;

  public static function getGenders() {
    return array(
      Person::GENDER_UNKNOWN => Yii::t('app', 'Unknown'),
      Person::GENDER_MALE => Yii::t('app', 'Male'),
      Person::GENDER_FEMALE => Yii::t('app', 'Female'),
      Person::GENDER_GAY => Yii::t('app', 'Gay'),
      Person::GENDER_LESBIAN => Yii::t('app', 'Lesbian')
    );
  }

  protected function getGender() {
    $genders = $this->getGenders();
    return Util::get($genders, $this->gender, $genders[Person::GENDER_UNKNOWN]);
  }

  public static function getDefaultPictures() {
    return array(
      Person::GENDER_UNKNOWN => "unknown.png",
      Person::GENDER_MALE => "male.png",
      Person::GENDER_FEMALE => "female.png",
      Person::GENDER_GAY => "gay.png",
      Person::GENDER_LESBIAN => "lesbian.png"
    );
  }

  public function getPicture() {
    if(!empty($this->picture)) {
      return Yii::getPathOfAlias("personOriginalURL") . "/" . $this->picture;
    } else {
      $defaultPictures = $this->getDefaultPictures();
      if(array_key_exists($this->gender, $defaultPictures)) {
        return Yii::getPathOfAlias("personDefaultURL") . "/" . $defaultPictures[$this->gender];
      } else {
        return Yii::getPathOfAlias("personDefaultURL") . "/" . $defaultPictures[Person::GENDER_UNKNOWN];
      }
    }
  }

  public static function getPersonPicture($gender) {
    $defaultPictures = Person::getDefaultPictures();
    if(array_key_exists($gender, $defaultPictures)) {
      return Yii::getPathOfAlias("personDefaultURL") . "/" . $defaultPictures[$gender];
    } else {
      return Yii::getPathOfAlias("personDefaultURL") . "/" . $defaultPictures[Person::GENDER_UNKNOWN];
    }
  }

  public static function getPictureUrl($picture) {
    return Yii::getPathOfAlias("personOriginalURL") . "/" . $picture;
  }

  public static function getPictureUrlSmall($picture) {
    return Yii::getPathOfAlias("personSmallURL") . "/" . $picture;
  }

  protected function getDateValue($date) {
    $result = "";
    $date = new DateTime($date);
    $result = $result . date_format($date, "d ");
    $result = $result . Yii::t('app', 'month');
    $result = $result . date_format($date, " m ");
    $result = $result . Yii::t('app', 'year');
    $result = $result . date_format($date, " Y");
    return $result;
  }

  public function getInfoTranslated() {
    $unknownText = Yii::t('app', 'Unknown');
    return array(
      "id" => $this->id,
      "name" => empty($this->name) ? $unknownText : $this->name,
      "aliveStatus" => $this->getAliveStatus(),
      "job" => empty($this->job) ? $unknownText : $this->job,
      "address" => empty($this->address) ? $unknownText : $this->address,
      "gender" => $this->getGender(),
      "picture" => $this->getPicture(),
      "phoneNo" => empty($this->phone_no) ? $unknownText : $this->phone_no,
      "history" => empty($this->history) ? $unknownText : $this->history,
      "otherInformation" => empty($this->other_information) ? $unknownText : $this->other_information,
      "birthDate" => empty($this->birth_date) ? $unknownText : $this->getDateValue($this->birth_date),
      "deathDate" => empty($this->death_date) ? $unknownText : $this->getDateValue($this->death_date),
      "treeUrl" => Yii::app()->createUrl("/pedigree/tree", array("root" => $this->id)),
      "detailUrl" => Yii::app()->createUrl("/person/detail", array("id" => $this->id))
    );
  }

  public function getMarriages() {
    $marriages = array();

    $marriagesHusband = $this->marriagesHusband;
    foreach($marriagesHusband as $marriage) {
      array_push($marriages, array(
        "id" => $marriage->wife_id,
        "name" => $marriage->wife->name,
        "picture" => empty($marriage->wife->picture) ?
                   Person::getPersonPicture($marriage->wife->gender) :
                   Person::getPictureUrlSmall($marriage->wife->picture)
      ));
    }

    $marriagesWife = $this->marriagesWife;
    foreach($marriagesWife as $marriage) {
      array_push($marriages, array(
        "id" => $marriage->husband_id,
        "name" => $marriage->husband->name,
        "picture" => empty($marriage->husband->picture) ?
                   Person::getPersonPicture($marriage->husband->gender) :
                   Person::getPictureUrlSmall($marriage->husband->picture)
      ));
    }

    return $marriages;
  }

	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Person the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'person';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('alive_status, gender', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>500),
			array('phone_no, id_card', 'length', 'max'=>50),
			array('birth_date, death_date, job, address, picture, history, other_information', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, birth_date, death_date, alive_status, job, address, picture, gender, phone_no, id_card, history, other_information', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'marriagesHusband' => array(self::HAS_MANY, 'Marriage', 'husband_id'),
			'marriagesWife' => array(self::HAS_MANY, 'Marriage', 'wife_id'),
			'pedigrees' => array(self::HAS_MANY, 'Pedigree', 'root_id'),
			'hierarchies' => array(self::HAS_MANY, 'Hierarchy', 'father_id'),
			'hierarchies1' => array(self::HAS_MANY, 'Hierarchy', 'mother_id'),
			'hierarchies2' => array(self::HAS_MANY, 'Hierarchy', 'child_id'),
      "marriagesCount" => array(self::STAT, "MarriageUnion", "inside_person_id"),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'birth_date' => 'Birth Date',
			'death_date' => 'Death Date',
			'alive_status' => 'Alive Status',
			'job' => 'Job',
			'address' => 'Address',
			'picture' => 'Picture',
			'gender' => 'Gender',
			'phone_no' => 'Phone No',
			'id_card' => 'Id Card',
			'history' => 'History',
			'other_information' => 'Other Information',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('birth_date',$this->birth_date,true);
		$criteria->compare('death_date',$this->death_date,true);
		$criteria->compare('alive_status',$this->alive_status);
		$criteria->compare('job',$this->job,true);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('picture',$this->picture,true);
		$criteria->compare('gender',$this->gender);
		$criteria->compare('phone_no',$this->phone_no,true);
		$criteria->compare('id_card',$this->id_card,true);
		$criteria->compare('history',$this->history,true);
		$criteria->compare('other_information',$this->other_information,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
?>
