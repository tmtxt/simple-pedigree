<?php

/**
 * This is the model class for table "marriage".
 *
 * The followings are the available columns in table 'marriage':
 * @property integer $id
 * @property integer $husband_id
 * @property integer $wife_id
 * @property string $start_date
 * @property string $end_date
 * @property integer $status
 * @property string $information
 * @property integer $order
 *
 * The followings are the available model relations:
 * @property Person $husband
 * @property Person $wife
 */
class Marriage extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Marriage the static model class
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
		return 'marriage';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('husband_id, wife_id, status, order', 'numerical', 'integerOnly'=>true),
			array('start_date, end_date, information', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, husband_id, wife_id, start_date, end_date, status, information, order', 'safe', 'on'=>'search'),
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
			'husband' => array(self::BELONGS_TO, 'Person', 'husband_id'),
			'wife' => array(self::BELONGS_TO, 'Person', 'wife_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'husband_id' => 'Husband',
			'wife_id' => 'Wife',
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

		$criteria->compare('id',$this->id);
		$criteria->compare('husband_id',$this->husband_id);
		$criteria->compare('wife_id',$this->wife_id);
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