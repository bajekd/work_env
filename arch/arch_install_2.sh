#!/bin/bash
# run as root

partition_boot=/dev/nvme0n1p1
user=bajek

#---------------------------
# services
#---------------------------
echo "Enabling services"
systemctl enable NetworkManager
systemctl enable sshd
systemctl enable bluetooth

#---------------------------
# GRUB
#---------------------------
echo "Installing GRUB"
mkdir /boot/EFI
mount $partition_boot /boot/EFI
grub-install --target=x86_64-efi --bootloader-id=grub_uefi --recheck
grub-mkconfig -o /boot/grub/grub.cfg

#---------------------------
# locale
#---------------------------
echo "Setting up locate"
echo en_GB.UTF-8 UTF-8 >> /etc/locale.gen
locale-gen
cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
localectl set-x11-keymap pl 

#---------------------------
# users
#---------------------------
echo "Setting up user"
useradd -m -g users -G wheel $user
echo "Set password for root"
passwd
echo "Set password for $user"
passwd $user
read -p "Runng: EDITOR=nvim visudo to uncomment: %wheel ALL=(ALL)... Press enter to continue"
EDITOR=nvim visudo
echo "Aftet that exit arch-chroot and reboot"
