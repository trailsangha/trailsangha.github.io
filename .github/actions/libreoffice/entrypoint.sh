#!/bin/sh -l

#
# Boilerplate to run parameter 1 as command.
#


# OLD FORMAT:
#
# - name: Set output
#  run: echo "::set-output name={name}::{value}"
#
# NEW FORMAT:
#
# - name: Set output
#   run: echo "{name}={value}" >> $GITHUB_OUTPUT
#

# OLD CODE:
# sh -c "$1"
# time=$(date)
# echo "::set-output name=time::$time"

# NEW CODE:
sh -c "$1"
time=$(date)
echo "time=$time" >> $GITHUB_OUTPUT
