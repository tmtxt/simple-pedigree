#
# Cookbook Name:: vagrant
# Recipe:: default
#
# Copyright 2012, Cogini
#
# All rights reserved - Do Not Redistribute
#

assets_dir = '/home/vagrant/assets'

bash 'workaround assets' do
    code <<-EOH
        [[ -d #{assets_dir} ]] || mkdir -p #{assets_dir}
        [[ -h /vagrant/assets ]] || ln -s #{assets_dir} /vagrant/
    EOH
end

include_recipe 'main'
include_recipe 'nodejs'


execute 'npm install -g socket.io'


# Node.js has something wrong with symlink

csync_path = '/home/vagrant/css-sync'

bash 'install css-sync' do
    code <<-EOH
        [[ -d #{csync_path} ]] || git clone git://github.com/phunehehe/css-sync.git #{csync_path}
        cd #{csync_path}
        git fetch
        git reset --hard origin/master
    EOH
end

link "#{node[:tbbc][:site_dir]}/css-sync" do
    to csync_path
end

template '/etc/init/css-sync.conf' do
    source 'upstart-csync.erb'
end

template '/home/vagrant/css-sync/config.js' do
    source 'csync_config.js.erb'
end


service 'css-sync' do
    provider Chef::Provider::Service::Upstart
    action [:enable, :start]
end
