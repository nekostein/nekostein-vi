#!/bin/bash

node static/seal3.tex.d/seal3-bg1.js &&
rsvg-convert static/seal3.tex.d/seal3-bg1.js.svg --format=pdf -o .tmp/seal3-bg1.js.svg.pdf
# rsvg-convert static/seal3.tex.d/seal3-bg1.js.svg -o .tmp/seal3-bg1.js.svg.png

ntex static/seal3.tex.d/seal3-component1.tex
# ntex static/seal3.tex

### Enable these later...
USE_POPPLER=y DPI=1800 ntex static/seal3.tex --png
magick _dist/static/seal3.pdf-1.png -level 49%,51% -fuzz 25% -colors 2 -transparent white -level 49%,51% -scale 50% _dist/static/seal3.pdf-1.png

### Generate alternative artifacts
for opacity in 05 10 15 20 50 60 70 80; do
    magick _dist/static/seal3.pdf-1.png -alpha Set -channel A -evaluate Multiply "0.$opacity" "_dist/static/seal3.pdf-1.opa$opacity.png"
done
