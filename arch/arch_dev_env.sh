#!/bin/bash
# run as bajek

ruby_version=3.2.2
rails_version=7.0.4.3
nodejs_version=18.15.0

#--------------------
# asdf
#--------------------
git clone https://github.com/excid3/asdf.git ~/.asdf

#--------------------
# ruby, rails
#--------------------

# ruby
asdf plugin add ruby
asdf install ruby $ruby_version
asdf global ruby $ruby_version
gem update --system # update to the latest Rubygems version

# rails 
gem install rails -v $rails_version

#--------------------
# nodejs 
#--------------------

asdf plugin add nodejs
asdf install nodejs $nodejs_version
asdf global nodejs $nodejs_version
npm install -g yarn # install yarn for Rails jsbundling/cssbundling or webpacker

#--------------------
# psql
#--------------------
sudo su - postgres -c "initdb --locale en_GB.UTF-8 -D /var/lib/postgres/data" # postgres user by default doesn't have any passwd, so it is necessary to use sudo in order to skip prompt for passwd

sudo systemctl enable postgresql
sudo systemctl start postgresql

sudo -u postgres psql -c "CREATE ROLE bajek WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION BYPASSRLS PASSWORD 'Lomtjjz90/'"
sudo -u postgres psql -c "CREATE DATABASE bajek OWNER bajek"

#--------------------
# memcached
#--------------------
paru -S memcached
sudo systemctl enable memcached
 
