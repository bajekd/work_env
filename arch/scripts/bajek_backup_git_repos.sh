#!/bin/bash

# --------------------
# Remove .git folder and make .tar.gz file from each of following repos:
#   backups
#   c-plus-plus
#   c-sharp
#   css
#   hi_git
#   java
#   javascript
#   kotlin
#   php
#   python
#   ruby
#   rails
#   TDCM
#   winc
#   work_env
# --------------------

backup_repo() {
  local repo_name=$1
  local target_dir="$HOME/Downloads/$repo_name"
  local current_date=$(date -u +%d_%m_%y) # UTC time
  local compressed_file="$HOME/Downloads/${repo_name}_$current_date.tar.gz"

  echo -e "\nBacking up $repo_name repo\n"

  if [ ! -d "$target_dir" ]; then
    git clone "git@github.com:bajekd/$repo_name.git" "$target_dir"
  fi

  rm -rf "${target_dir}/.git"
  tar -czf $compressed_file $target_dir
  find ~/MEGA/backups/ -type f -regex "${repo_name}_*.gz.tar" -exec rm {} \;
  mv $compressed_file ~/MEGA/backups  
  
  rm -rf $target_dir
}

repos=("backups" "c-plus-plus" "c-sharp" "css" "django" "hi_git" "java" "javascript" "kotlin" "php" "python" "ruby" "rails" "TDCM" "winc" "work_env")

for repo in "${repos[@]}"; do
  backup_repo "$repo"
done
