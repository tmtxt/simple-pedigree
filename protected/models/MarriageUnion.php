<?php

/**
 * This is the model class for table "marriage_union".
 *
 * The followings are the available columns in table 'marriage_union':
 * @property integer $inside_person_id
 * @property string $inside_person_name
 * @property string $inside_person_picture
 * @property integer $outside_person_id
 * @property string $outside_person_name
 * @property string $outside_person_picture
 * @property string $start_date
 * @property string $end_date
 * @property integer $status
 * @property string $information
 * @property integer $order
 */
class MarriageUnion extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return MarriageUnion the static model class
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
		return 'marriage_union';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('inside_person_id, outside_person_id, status, order', 'numerical', 'integerOnly'=>true),
			array('inside_person_name, outside_person_name', 'length', 'max'=>500),
			array('inside_person_picture, outside_person_picture, start_date, end_date, information', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('inside_person_id, inside_person_name, inside_person_picture, outside_person_id, outside_person_name, outside_person_picture, start_date, end_date, status, information, order', 'safe', 'on'=>'search'),
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
			'inside_person_id' => 'Inside Person',
			'inside_person_name' => 'Inside Person Name',
			'inside_person_picture' => 'Inside Person Picture',
			'outside_person_id' => 'Outside Person',
			'outside_person_name' => 'Outside Person Name',
			'outside_person_picture' => 'Outside Person Picture',
			'start_date' => 'Start Date',
			'end_date' => 'End Date',
			'status' => 'Status',
			'information' => 'Information',
			'order' => 'Order',
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

		$criteria->compare('inside_person_id',$this->inside_person_id);
		$criteria->compare('inside_person_name',$this->inside_person_name,true);
		$criteria->compare('inside_person_picture',$this->inside_person_picture,true);
		$criteria->compare('outside_person_id',$this->outside_person_id);
		$criteria->compare('outside_person_name',$this->outside_person_name,true);
		$criteria->compare('outside_person_picture',$this->outside_person_picture,true);
		$criteria->compare('start_date',$this->start_date,true);
		$criteria->compare('end_date',$this->end_date,true);
		$criteria->compare('status',$this->status);
		$criteria->compare('information',$this->information,true);
		$criteria->compare('order',$this->order);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
?>
