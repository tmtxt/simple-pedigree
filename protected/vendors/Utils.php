<?
class Utils {

    # Convert datetime in UTC to local timezone for application
    public static function datetimeToLocal($datetime, $format='Y-m-d H:i:s') {
        $dt = new DateTime($datetime, new DateTimeZone("UTC"));
        $dt->setTimezone(new DateTimeZone(Yii::app()->params['timezone']));
        return $dt->format($format);
    }

    # Convert date in UTC to local timezone for application
    public static function dateToLocal($date) {
        $dt = new DateTime($date, new DateTimeZone("UTC"));
        $dt->setTimezone(new DateTimeZone(Yii::app()->params['timezone']));
        return $dt->format('Y-m-d');
    }

    public static function addDays($days, $datetime='') {
        if ($datetime) {
            $time = strtotime($datetime) + (60 * 60 * 24 * $days);
        }
        else {
            $time = time() + (60 * 60 * 24 * $days);
        }
        return date('Y-m-s H:i:s', $time);
    }

}
?>
