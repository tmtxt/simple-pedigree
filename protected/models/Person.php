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
			'marriages' => array(self::HAS_MANY, 'Marriage', 'husband_id'),
			'marriages1' => array(self::HAS_MANY, 'Marriage', 'wife_id'),
			'pedigrees' => array(self::HAS_MANY, 'Pedigree', 'root_id'),
			'hierarchies' => array(self::HAS_MANY, 'Hierarchy', 'father_id'),
			'hierarchies1' => array(self::HAS_MANY, 'Hierarchy', 'mother_id'),
			'hierarchies2' => array(self::HAS_MANY, 'Hierarchy', 'child_id'),
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