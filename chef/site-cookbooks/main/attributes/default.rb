set[:crowd][:yii_version] = '1.1.13'

default[:crowd][:app_user] = 'crowd'
default[:crowd][:csync_enable] = false
default[:crowd][:csync_port] = 0
default[:crowd][:db][:database] = 'crowd'
default[:crowd][:db][:host] = 'localhost'
default[:crowd][:db][:user] = 'crowd'

default[:crowd][:python][:virtualenv] = '/home/crowd/python-env'
default[:crowd][:python][:build_dir] = '/home/crowd/build'
set[:crowd][:python][:schemup][:version] = '5f5d35f5c7e9708e62ca43aa4743610e2cb696ae'
