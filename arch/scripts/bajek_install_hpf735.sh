#!/bin/bash

paru cups
paru cups-pdf

sudo systemctl enable cups.service
sudo systemctl start cups.service

paru usbutils
paru hplip
paru python-pyqt5

hp-setup -u

vivaldi-stable http://localhost:631/
