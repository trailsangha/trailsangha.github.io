#!/bin/bash

#
# Convert ./_etc/events/events.ods to ./_data/events/events.css
#

rootDir="${1:-.}"

libreoffice --invisible --headless --convert-to csv "$rootDir/_etc/events/events.ods" --outdir "$rootDir/_data"

