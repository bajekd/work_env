#!/bin/bash
# run as root

partition_boot=/dev/nvme0n1p1
partition_root=/dev/nvme0n1p2

#---------------------------
# mkfs, mount, fstab
#---------------------------
echo "Creating filesystem, mounting and generating fstab file"
mkfs.fat -F32 $partition_boot
mkfs.ext4 -F $partition_root
mount $partition_root /mnt
mkdir /mnt/etc
genfstab -U -p /mnt >> /mnt/etc/fstab

#---------------------------
# base install, chroot
#---------------------------
echo "exec base installation and login to the new system"
pacstrap /mnt base linux-firmware linux linux-lts linux-headers linux-lts-headers sudo git base-devel openssh networkmanager wpa_supplicant grub efibootmgr dosfstools os-prober mtools nvidia nvidia-utils nvidia nvidia-utils bluez bluez-utils neovim xorg-server reflector

arch-chroot /mnt
