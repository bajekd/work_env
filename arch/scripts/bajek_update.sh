#!/bin/bash

echo "Update pacman mirror list"
sudo reflector --country Poland --protocol https --sort rate --save /etc/pacman.d/mirrorlist
cat /etc/pacman.d/mirrorlist
echo "-----------------------"

echo -e "\nUpdating packages"
paru -Syyu;
echo "-----------------------"

echo -e "\nUninstalling unnecessary packages"
if [[ $(paru -Qdtq) ]]; then
    paru -Rns $(paru -Qdtq)
else
    echo -e "No unnecessary packages found"
fi
echo "-----------------------"

echo -e "\n Remove pacman cache"
paru -Sc --noconfirm; # Remove cached packages that are not currently installed
paccache -r; # Remove all cached packages but the 3 most recent package versions
echo "-----------------------"

echo -e "\n Remove ~/.cache/*"
rm -rf ~/.cache/*
echo "-----------------------"

echo -e "\n Remove unnecessary files"
rm -rf ~/.psql_history ~/.bash_history ~/.python_history ~/.cache
rm -rf ~/.cargo/registry 
rm -rf ~/.local/share/recently-used.xbel
rm -rf ~/.irb_history
rm -rf ~/.rdbg_history
