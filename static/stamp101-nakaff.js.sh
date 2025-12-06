#!/bin/bash

node static/stamp101-nakaff.js
bash misc/svg-text-to-outline.sh static/stamp101-nakaff.js.svg static/stamp101-nakaff.js.tto.svg
cp static/stamp101-nakaff.js.svg _dist/static/stamp101-nakaff.js.svg
cp static/stamp101-nakaff.js.tto.svg _dist/static/stamp101-nakaff.js.tto.svg
rsvg-convert static/stamp101-nakaff.js.svg -h 3000 -o _dist/static/stamp101-nakaff.js.svg.png



rsync -av \
  --include 'stamp101*' \
  --exclude '*' \
  _dist/static/ _dist/wwwmisc/static/
