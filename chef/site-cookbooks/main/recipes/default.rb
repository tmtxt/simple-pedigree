#
# Cookbook Name:: main
# Recipe:: default
#
# Copyright 2012, Cogini
#
# All rights reserved - Do Not Redistribute
#

include_recipe "apt"
include_recipe "yii"
include_recipe "php::fpm"
include_recipe "php::module_pgsql"
include_recipe "nginx"
include_recipe "postgresql::server"


pgsql_user "tbbc" do
    password "vagrant"
end

pgsql_db "tbbc" do
    owner "tbbc"
end

user "tbbc" do
    action :create
    supports :managed_home => true
end


directory node[:tbbc][:log_dir] do
    action :create
    recursive true
end

template "/etc/nginx/sites-available/tbbc" do
    source "nginx-tbbc.erb"
    mode "0644"
end

template "/vagrant/index.php" do
    source "yii-index.php.erb"
    mode "0644"
end

template "/vagrant/protected/config/local.php" do
    source "yii-local.php.erb"
    mode "0644"
end

template "/vagrant/protected/config/db.json" do
    source "yii-db.json.erb"
    mode "0644"
end

execute "/vagrant/protected/scripts/init_perms.sh"

nginx_site "default" do
    action :disable
end

nginx_site "tbbc" do
    action :enable
end
