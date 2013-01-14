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
include_recipe 'postgresql::client'
include_recipe 'git'


yii_version = node[:crowd][:yii_version]
app_user = node[:crowd][:app_user]
db = node[:crowd][:db]
site_dir = node[:crowd][:site_dir]


yii_framework yii_version do
    symlink "#{site_dir}/../yii"
end


if db[:host] == 'localhost'

    include_recipe 'postgresql::server'
    db_user = db[:user]

    pgsql_user db_user do
        password db[:password]
    end

    pgsql_db db[:database] do
        owner db_user
    end
end


user app_user do
    home "/home/#{app_user}"
    shell '/bin/bash'
    supports :manage_home => true
    action :create
end


directory node[:crowd][:log_dir] do
    action :create
    recursive true
end


template "#{site_dir}/protected/config/local.php" do
    source 'yii-local.php.erb'
    mode '0644'
end

template "#{site_dir}/protected/config/db.json" do
    source 'yii-db.json.erb'
    mode '0644'
end

template "#{site_dir}/protected/scripts/set_env.sh" do
    source 'set_env.sh.erb'
    mode '0644'
end


%w{ protected/runtime assets images/uploads }.each do |component|

    the_dir = "#{site_dir}/#{component}"

    bash 'setup permissions' do
        code <<-EOH
            mkdir -p #{the_dir}
            chgrp -R www-data #{the_dir}
            chmod -R g+rw #{the_dir}
            find #{the_dir} -type d | xargs chmod g+x
        EOH
    end
end


site_name = 'crowd'

template "/etc/nginx/sites-available/#{site_name}" do
    source 'nginx-crowd.erb'
    mode '0644'
end

nginx_site 'default' do
    action :disable
end

nginx_site site_name do
    action :enable
end
