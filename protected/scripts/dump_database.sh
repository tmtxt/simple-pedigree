#!/bin/sh

bin_dir=$(dirname $0)
. $bin_dir/set_env.sh

/usr/bin/mysqldump -d -h $DB_HOST -u $DB_USER -p${DB_PASS} $DB_NAME > $DB_NAME.sql
/usr/bin/mysqldump -h $DB_HOST -u $DB_USER -p${DB_PASS} $DB_NAME > $DB_NAME.dump
