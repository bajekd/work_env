#!/bin/bash
# run as bajek

swap_size=8192
country=Poland
partition_with_swap_file=/dev/nvme0n1p2
path_to_backup=/run/usb/work-envs/arch

#---------------------
# swapfile
#---------------------
sudo dd if=/dev/zero of=/swapfile bs=1M count=$swap_size status=progress
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

#---------------------
# timezone, hostname
#---------------------
# timedatectl list-timezones
sudo timedatectl set-timezone Europe/Warsaw
sudo systemctl enable systemd-timesyncd

sudo hostnamectl set-hostname bajek
echo "127.0.0.1 localhost" | sudo tee -a /etc/hosts
echo "127.0.1.1 bajek" | sudo tee -a /etc/hosts

#---------------------
# paru
#---------------------
sudo reflector --country $country --protocol https --sort rate --save /etc/pacman.d/mirrorlist
# in case of old iso - update archlinux-keyring 
sudo pacman-key --init
sudo pacman -Syy --noconfirm archlinux-keyring
sudo pacman-key --populate archlinux

mkdir ~/Downloads
cd ~/Downloads
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si # cannot be run as root
rm -rf ~/Downloads/paru
cd $path_to_backup

#---------------------
# install packages
#---------------------
paru -S --noconfirm - < $path_to_backup/packages_to_install.txt # list has to have only packages to install (no comments, no reinstallations etc (abort process)); paru -Qe

#--------------------
# config
#   alacritty
#   flameshot
#   i3
#   i3status
#   nvim
#   tmux
#   powerkit
#   redshift
#   rofi
#   starship
#   vifm
#   vivaldi
#--------------------

# alacritty
mkdir -pv ~/.config/alacritty
cat $path_to_backup/dotfiles/config/alacritty/alacritty.yml > ~/.config/alacritty/alacritty.yml

# flameshot
# run in terminal: `flameshot config` to change config
mkdir -pv ~/.config/flameshot
cat $path_to_backup/dotfiles/config/flameshot/flameshot.ini > ~/.config/flameshot/flameshot.ini

# i3
mkdir ~/.config/i3
cat $path_to_backup/dotfiles/config/i3/config > ~/.config/i3/config

# i3status
mkdir -pv ~/.config/i3status
cat $path_to_backup/dotfiles/config/i3status/config > ~/.config/i3status/config

# nvim
mkdir -pv ~/.config/nvim
cp -r $path_to_backup/dotfiles/config/nvim/ ~/.config/nvim

# tmux
mkdir -pv ~/.config/tmux
cp -r $path_to_backup/dotfiles/config/tmux/ ~/.config/tmux

# powerkit
mkdir -pv ~/.config/powerkit
cat $path_to_backup/dotfiles/config/powerkit/powerkit.conf > ~/.config/powerkit/powerkit.conf

# redshift
cat $path_to_backup/dotfiles/config/redshift.conf > ~/.config/redshift.conf

# rofi
mkdir -pv ~/.config/rofi
cat $path_to_backup/dotfiles/config/rofi/config.rasi > ~/.config/rofi/config.rasi

# starship
cat $path_to_backup/dotfiles/config/starship.toml > ~/.config/starship.toml

# vifm
mkdir -pv ~/.config/vifm
cp -r $path_to_backup/dotfiles/config/vifm/ ~/.config/vifm

# vivaldi
mkdir -pv ~/.config/vivaldi
cp -r $path_to_backup/dotfiles/config/vivaldi/Default ~/.config/vivaldi

#--------------------
# home 
#   .bash_aliases
#   .bashrc
#   .gitcompletion.bash
#   .gitconfig
#   .inputrc
#   wallpaper, lock screen
#   .xinitrc
#--------------------

# bashrc, bash_aliases
cat $path_to_backup/dotfiles/home/.bashrc > ~/.bashrc
cat $path_to_backup/dotfiles/home/.bash_aliases > ~/.bash_aliases

# git
cat $path_to_backup/dotfiles/home/.git-completion.bash > ~/.git-completion.bash
cat $path_to_backup/dotfiles/home/.gitconfig > ~/.gitconfig

# inputrc
cat $path_to_backup/dotfiles/home/.inputrc > ~/.inputrc

# wallpaper, lock screen
mkdir -pv ~/Pictures/wallpapers
cp $path_to_backup/dotfiles/home/wallpapers/dracula.png ~/Pictures/wallpapers
cp $path_to_backup/dotfiles/home/wallpapers/dracula_lock.png ~/Pictures/wallpapers

# xinitrc
cat $path_to_backup/dotfiles/home/.xinitrc > ~/.xinitrc

#--------------------
# ssh
#--------------------

#echo -e "\nType: /home/bajek/.ssh/github. Password: sudo"
#ssh-keygen -t ed25519 -C "blazejdobek94@gmail.com"
#eval "$(ssh-agent -s)"
#ssh-add ~/.ssh/github

mkdir -pv ~/.ssh
cat $path_to_backup/dotfiles/ssh/config > ~/.ssh/config
cat $path_to_backup/dotfiles/ssh/github > ~/.ssh/github
cat $path_to_backup/dotfiles/ssh/github.pub > ~/.ssh/github.pub
chmod 600 ~/.ssh/config ~/.ssh/github ~/.ssh/github.pub

#--------------------
# system
#   stuff with iwlwifi and NetworkManager 
#   desktop entries clean up + vifm desktop entry
#   dracula theme gtk
#   pacman.conf
#   set limits for journalctl logs
#   set keyboard layout
#--------------------

# stuff with iwlwifi and NetworkManager 
# power saving iwlwifi --> https://askubuntu.com/questions/1283313/unstable-wifi-connection-on-ubuntu-20-04
# set beacon timeout more than default 100 --> ilwifi
# disable connectivity checking --> NetworkManager
cat $path_to_backup/dotfiles/system/iwlwifi.conf | sudo tee /etc/modprobe.d/iwlwifi.conf
cat $path_to_backup/dotfiles/system/NetworkManager.conf | sudo tee /etc/NetworkManager/NetworkManager.conf

# clean up desktop entries
sudo rm /usr/share/applications/assistant.desktop
sudo rm /usr/share/applications/avahi-discover.desktop
sudo rm /usr/share/applications/bssh.desktop
sudo rm /usr/share/applications/bvnc.desktop
sudo rm /usr/share/applications/cmake-gui.desktop
sudo rm /usr/share/applications/designer.desktop
sudo rm /usr/share/applications/feh.desktop
sudo rm /usr/share/applications/google-maps-geo-handler.desktop
sudo rm /usr/share/applications/linguist.desktop
sudo rm /usr/share/applications/lstopo.desktop
sudo rm /usr/share/applications/lxsession-default-apps.desktop
sudo rm /usr/share/applications/lxsession-edit.desktop
sudo rm /usr/share/applications/openstreetmap-geo-handler.desktop
sudo rm /usr/share/applications/qdbusviewer.desktop
sudo rm /usr/share/applications/qv4l2.desktop
sudo rm /usr/share/applications/qvidcap.desktop
sudo rm /usr/share/applications/qwant-maps-geo-handler.desktop
sudo rm /usr/share/applications/redshift-gtk.desktop
sudo rm /usr/share/applications/sxiv.desktop
sudo rm /usr/share/applications/wheelmap-geo-handler.desktop
sudo rm /usr/share/applications/xscreensaver-settings.desktop
sudo rm /usr/share/applications/xscreensaver.desktop

# dracula theme gtk
sudo mkdir -pv /usr/share/themes/dracula
sudo cp -r $path_to_backup/dotfiles/system/dracula_gtk/* /usr/share/themes/dracula/

# pacman.conf
cat $path_to_backup/dotfiles/system/pacman.conf | sudo tee /etc/pacman.conf

# set limits for journalctl logs 
sudo journalctl --vacuum-size=250M
sudo journalctl --vacuum-time=5weeks

# set keyboard layout
localectl set-x11-keymap pl # requires authentiction for bajek

#--------------------
# user's scripts
#--------------------
mkdir -pv ~/.local/bin
cp ./scripts/* ~/.local/bin
chmod 755 ~/.local/bin/*

#--------------------
# hibernation and selection windows from grub
#--------------------
new_resume_UUID="resume=UUID=$(sudo blkid | grep $partition_with_swap_file | awk '{print $2}' | sed 's/UUID="//' | sed 's/.$//')"
new_resume_offset="resume_offset=$(sudo filefrag -v /swapfile | head -n 4 | tail -n 1 | awk '{print $4}' | awk '{print substr( $0, 1, length($0)-2 ) }')"

cat $path_to_backup/dotfiles/system/grub | sudo tee /etc/default/grub
sudo sed -i "s/\(resume=UUID=\).*/$new_resume_UUID $new_resume_offset i915.enable_psr=0\"/" /etc/default/grub # i915.enable_psr=0 prevent from screen flickering, test yourself maybe it will not be required any longer
cat $path_to_backup/dotfiles/system/mkinitcpio.conf | sudo tee /etc/mkinitcpio.conf

sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo mkinitcpio -P
