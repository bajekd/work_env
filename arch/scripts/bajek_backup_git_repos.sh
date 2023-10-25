#!/bin/bash

# --------------------
# Remove .git folder and make .tar.gz file from each of following repos:
#   backups
#   other_projects
#   python_projects
#   ruby_projects
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
  git clone git@github.com:blazejdobek/backups.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'backups_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup other_projects repo
# --------------------
target_dir="$HOME/Downloads/other_projects"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/other_projects_$current_date.tar.gz"

echo -e "\nBacking up other_projects repo\n"
if [ ! -d "$target_dir" ]; then
  git clone git@github.com:blazejdobek/other_projects.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'other_projects_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup python_projects repo
# --------------------
target_dir="$HOME/Downloads/python_projects"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/python_projects_$current_date.tar.gz"

echo -e "\nBacking up python_projects repo\n"
if [ ! -d "$target_dir" ]; then
  git clone git@github.com:blazejdobek/python_projects.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'python_projects_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir

# --------------------
# backup ruby_projects repo
# --------------------
target_dir="$HOME/Downloads/ruby_projects"
current_date=$(date -u +%d_%m_%y) # UTC time
compressed_file="$HOME/Downloads/ruby_projects_$current_date.tar.gz"

echo -e "\nBacking up ruby_projects repo\n"
if [ ! -d "$target_dir" ]; then
  git clone git@github.com:blazejdobek/ruby_projects.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'ruby_projects_+.gz.tar' -exec rm {} \;
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
  git clone git@github.com:blazejdobek/work_env.git
fi

rm -rf $target_dir/.git
tar -czf $compressed_file $target_dir

find ~/MEGA/backups/ -type f -regex 'work_env_+.gz.tar' -exec rm {} \;
mv $compressed_file ~/MEGA/backups  

rm -rf $target_dir
