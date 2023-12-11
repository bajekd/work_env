#!/bin/bash

sleep 3
xdotool search --onlyvisible --name 'Vivaldi' set_window --class 'Research'
i3-msg '[class="Research"] move to workspace 4: research'

