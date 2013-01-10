# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|

    # Every Vagrant virtual environment requires a box to build off of.
    config.vm.box = 'precise32'

    # The url from where the 'config.vm.box' box will be fetched if it
    # doesn't already exist on the user's system.
    # config.vm.box_url = 'http://domain.com/path/to/above.box'

    # Boot with a GUI so you can see the screen. (Default is headless)
    #config.vm.boot_mode = :gui

    # Forward a port from the guest to the host, which allows for outside
    # computers to access the VM, whereas host only networking does not.
    csync_port = 9242
    config.vm.forward_port 80, 9240
    config.vm.forward_port 22, 9241
    config.vm.forward_port 8888, csync_port

    # Share an additional folder to the guest VM. The first argument is
    # an identifier, the second is the path on the guest to mount the
    # folder, and the third is the path on the host to the actual folder.
    # config.vm.share_folder 'v-data', '/vagrant_data', '../data'
    apt_cache = './apt-cache'
    if File.directory?("#{apt_cache}/partial")
        config.vm.share_folder 'apt_cache', '/var/cache/apt/archives', apt_cache
    end

    config.vm.customize ['setextradata', :id, 'VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root', '1']

    # Enable provisioning with chef solo, specifying a cookbooks path, roles
    # path, and data_bags path (all relative to this Vagrantfile), and adding
    # some recipes and/or roles.
    config.vm.provision :chef_solo do |chef|

        chef.cookbooks_path = [
            'chef/chef-cookbooks',
            'chef/site-cookbooks',
        ]
        chef.roles_path = 'chef/chef-repo/roles'

        chef.json = {
            :tbbc => {
                :csync_enable => true,
                :csync_port => csync_port,
                :server_names => ['tbbc.cogini.com'],
                :log_dir => '/vagrant/logs',
                :site_dir => '/vagrant',
                :admin_email => 'support@vagrant.local',
                    :db => {
                    :database => 'tbbc_dev',
                    :host => 'localhost',
                    :password => 'secret',
                    :username => 'tbbc_dev'
                },
                :user => 'vagrant',
            }
        }

        chef.add_role 'vagrant_attributes'
        chef.add_recipe 'vagrant'

        #chef.data_bags_path = '../my-recipes/data_bags'
    end
end
