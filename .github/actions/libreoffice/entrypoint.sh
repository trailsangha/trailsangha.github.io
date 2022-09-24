#!/bin/sh -l

#
# Boilerplate to run parameter 1 as command.
#

sh -c "$1"
time=$(date)
echo "::set-output name=time::$time"
