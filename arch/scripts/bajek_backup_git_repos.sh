#!/bin/bash

# --------------------
# Remove .git folder and make .tar.gz file from each of following repos:
#   backups
#   python
#   ruby
#   rails
#   work_env
# --------------------

# --------------------
# backup backups repo
# --------------------
target_dir="$HOME/Downloads/backups"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/backups_$current_date.tar.gz"

echo -e "\nBacking up backups repo\n"
if [ ! -d "$target_dir" ]; then
  git clone git@github.com:bajekd/backups.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'backups_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup python repo
# --------------------
target_dir="$HOME/Downloads/python"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/python_$current_date.tar.gz"

echo -e "\nBacking up python repo\n"
if [ ! -d "$target_dir" ]; then
  git clone https://github.com/bajekd/python 
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'python_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup ruby repo
# --------------------
target_dir="$HOME/Downloads/ruby"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/ruby_$current_date.tar.gz"

echo -e "\nBacking up ruby repo\n"
if [ ! -d "$target_dir" ]; then
  git clone https://github.com/bajekd/ruby
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'ruby_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup rails repo
# --------------------
target_dir="$HOME/Downloads/rails"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/rails_$current_date.tar.gz"

echo -e "\nBacking up rails repo\n"
if [ ! -d "$target_dir" ]; then
  git clone https://github.com/bajekd/rails
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'rails_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup work_env repo
# --------------------
target_dir="$HOME/Downloads/work_env"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/work_env_$current_date.tar.gz"

echo -e "\nBacking up work_env repo\n"
if [ ! -d "$target_dir" ]; then
  git clone https://github.com/bajekd/work_env
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'work_env_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir
