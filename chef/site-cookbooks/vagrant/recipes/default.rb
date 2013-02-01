#
# Cookbook Name:: vagrant
# Recipe:: default
#
# Copyright 2012, Cogini
#
# All rights reserved - Do Not Redistribute
#

include_recipe 'main'
include_recipe 'nodejs'


execute 'npm install -g socket.io'


csync_path = "#{node[:crowd][:site_dir]}/css-sync"

bash 'install css-sync' do
    code <<-EOH
        [[ -d #{csync_path} ]] || git clone git://github.com/ubolonton/css-sync.git #{csync_path}
        cd #{csync_path}
        git fetch
        git reset --hard origin/master
    EOH
end

template '/etc/init/css-sync.conf' do
    source 'upstart-csync.erb'
    mode '0644'
end

template "#{csync_path}/config.js" do
    source 'csync_config.js.erb'
    mode '0644'
end


service 'css-sync' do
    provider Chef::Provider::Service::Upstart
    action [:enable, :start]
end
