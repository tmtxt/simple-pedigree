<?php

/**
 * This is the model class for table "hierarchy".
 *
 * The followings are the available columns in table 'hierarchy':
 * @property integer $id
 * @property integer $father_id
 * @property integer $mother_id
 * @property string $child_id
 * @property integer $child_order
 *
 * The followings are the available model relations:
 * @property Person $father
 * @property Person $mother
 * @property Person $child
 */
class Hierarchy extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Hierarchy the static model class
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
		return 'hierarchy';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('child_id', 'required'),
			array('father_id, mother_id, child_order', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, father_id, mother_id, child_id, child_order', 'safe', 'on'=>'search'),
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
			'father' => array(self::BELONGS_TO, 'Person', 'father_id'),
			'mother' => array(self::BELONGS_TO, 'Person', 'mother_id'),
			'child' => array(self::BELONGS_TO, 'Person', 'child_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'father_id' => 'Father',
			'mother_id' => 'Mother',
			'child_id' => 'Child',
			'child_order' => 'Child Order',
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
		$criteria->compare('father_id',$this->father_id);
		$criteria->compare('mother_id',$this->mother_id);
		$criteria->compare('child_id',$this->child_id,true);
		$criteria->compare('child_order',$this->child_order);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}