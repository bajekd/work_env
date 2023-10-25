#!/bin/bash

if [ $# != 1 ]; then
	echo "wth need exactly 1 argument to work!"
	exit 1
fi

dir=~/Documents/wth
if [ ! -d "$dir" ]; then
	mkdir $dir 
fi # $dir || mkdir $dir

file="${dir}/wth_${1}"
if [ !  -f "$file" ]; then
	touch $file 

	tldr $1 >> $file 

	echo "---------------------------- man ----------------------------\n" >> $file

	man $1 >> $file 
fi # $file || touch $file; tldr $1 >> $file; man $1 >> $file

more $file 
