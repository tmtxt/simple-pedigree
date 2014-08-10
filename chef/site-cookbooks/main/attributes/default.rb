set[:skeleton][:yii_version] = '1.1.13'
set[:skeleton][:pg_version] = '9.1'

default[:skeleton][:app_user] = 'pedigree'
default[:skeleton][:csync_enable] = false
default[:skeleton][:csync_port] = 0
default[:skeleton][:db][:database] = 'pedigree'
default[:skeleton][:db][:host] = 'localhost'
default[:skeleton][:db][:user] = 'pedigree'

default[:skeleton][:python][:virtualenv] = '/home/pedigree/python-env'
default[:skeleton][:python][:build_dir] = '/home/pedigree/build'
set[:skeleton][:python][:schemup][:version] = '5f5d35f5c7e9708e62ca43aa4743610e2cb696ae'

default[:skeleton][:environment] = 'dev' # 'dev' or 'production'

default[:skeleton][:ssl] = nil
