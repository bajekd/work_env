#!/bin/bash

if [[ $# != 1 ]]; then
  echo "redshift: option requires an argument -- 'O'"
return 1
fi

pkill redshift
if [[ $? == 0 ]]; then
sleep 5
fi

redshift -m randr:screen=all -P -O $1

# time=$(( $(date +%H%M) )) #show current hours and minutes and convert it to integer
#
# if (( $time >= 2000 && $time < 2015 )); then # $time between <20:00; 20:15)
#   redshift -P -O 3000
# elif (( $time >= 2015 && $time < 2030 )); then # $time between <20:15, 20:30)
#   redshift -P -O 2500
# elif (( $time >= 2030 && $time < 2045 )); then # $time between <20:30; 20:45)
#   redshift -P -O 2000
# elif (( $time >= 2045 && $time < 2100 )); then # $time between <20:45; 21:00)
#   redshift -P -O 1500
# elif (( $time >= 2100 || $time < 700 )); then # $time between <21:00; 7:00)
#   redshift -P -O 1000
# else
#  redshift -P -O 3500
# fi

