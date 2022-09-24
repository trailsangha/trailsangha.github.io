#!/bin/bash

#
# Convert ./_etc/events.ods to ./_data/events.css
#

rootDir="${1:-.}"

libreoffice --invisible --headless --convert-to csv "$rootDir/_etc/events.ods" --outdir "$rootDir/_data"

