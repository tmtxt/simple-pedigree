#
# Cookbook Name:: main
# Recipe:: default
#
# Copyright 2012, Cogini
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'apt'
include_recipe 'php::fpm'
include_recipe 'php::module_pgsql'
include_recipe 'nginx'


tbbc = node[:tbbc]
db = node[:tbbc][:db]
app_user = tbbc[:user]
site_dir = tbbc[:site_dir]


yii_framework tbbc[:yii_version] do
    action :install
end


if db[:host] == 'localhost'

    include_recipe 'postgresql::server'
    db_user = db[:username]

    pgsql_user db_user do
        password db[:password]
    end

    pgsql_db db[:database] do
        owner db_user
    end
end


user app_user do
    action :create
    supports :managed_home => true
end


directory tbbc[:log_dir] do
    action :create
    recursive true
end


template '/etc/nginx/sites-available/tbbc' do
    source 'nginx-tbbc.erb'
    mode '0644'
end

template "#{site_dir}/index.php" do
    source 'yii-index.php.erb'
    mode '0644'
end

template "#{site_dir}/protected/config/local.php" do
    source 'yii-local.php.erb'
    mode '0644'
end

template "#{site_dir}/protected/config/db.json" do
    source 'yii-db.json.erb'
    mode '0644'
end


execute "#{site_dir}/protected/scripts/init_perms.sh"


nginx_site 'default' do
    action :disable
end

nginx_site 'tbbc' do
    action :enable
end
