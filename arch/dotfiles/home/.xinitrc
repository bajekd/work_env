#!bin/bash

# Available options with “caps” => grep "caps" /usr/share/X11/xkb/rules/xorg.lst
setxkbmap -option caps:escape,shift:both_capslock

# Start the window manager (i3)
exec i3
