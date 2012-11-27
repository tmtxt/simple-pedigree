#
# Cookbook Name:: vagrant
# Recipe:: default
#
# Copyright 2012, Cogini
#
# All rights reserved - Do Not Redistribute
#

assets_dir = "/home/vagrant/assets"

bash "workaround assets" do
    code <<-EOH
        [[ -d #{assets_dir} ]] || mkdir -p #{assets_dir}
        [[ -h /vagrant/assets ]] || ln -s #{assets_dir} /vagrant/
    EOH
end

include_recipe "main"
