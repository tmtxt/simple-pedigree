<?php

/**
 * This is the model class for table "hierarchy_union".
 *
 * The followings are the available columns in table 'hierarchy_union':
 * @property integer $inside_parent_id
 * @property string $inside_parent_name
 * @property integer $outside_parent_id
 * @property string $outside_parent_name
 * @property string $child_id
 * @property string $child_name
 * @property integer $child_order
 */
class HierarchyUnion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return HierarchyUnion the static model class
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
		return 'hierarchy_union';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('inside_parent_id, outside_parent_id, child_order', 'numerical', 'integerOnly'=>true),
			array('inside_parent_name, outside_parent_name, child_name', 'length', 'max'=>500),
			array('child_id', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('inside_parent_id, inside_parent_name, outside_parent_id, outside_parent_name, child_id, child_name, child_order', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'inside_parent_id' => 'Inside Parent',
			'inside_parent_name' => 'Inside Parent Name',
			'outside_parent_id' => 'Outside Parent',
			'outside_parent_name' => 'Outside Parent Name',
			'child_id' => 'Child',
			'child_name' => 'Child Name',
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

		$criteria->compare('inside_parent_id',$this->inside_parent_id);
		$criteria->compare('inside_parent_name',$this->inside_parent_name,true);
		$criteria->compare('outside_parent_id',$this->outside_parent_id);
		$criteria->compare('outside_parent_name',$this->outside_parent_name,true);
		$criteria->compare('child_id',$this->child_id,true);
		$criteria->compare('child_name',$this->child_name,true);
		$criteria->compare('child_order',$this->child_order);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}