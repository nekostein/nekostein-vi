#!/bin/bash

for bg in bg1 bg2; do
    node static/seal3.tex.d/seal3-$bg.js &&
    rsvg-convert static/seal3.tex.d/seal3-$bg.js.svg --format=pdf -o .tmp/seal3-$bg.js.svg.pdf
done


ntex static/seal3.tex.d/seal3-component1.tex
# ntex static/seal3.tex

### Enable these later...
# USE_POPPLER=y DPI=1800 ntex static/seal3.tex --png
ntex static/seal3.tex
DPI=1800 gspdftopng _dist/static/seal3.pdf
magick _dist/static/seal3.pdf-1.png -level 49%,51% -fuzz 25% -colors 2 -transparent white -level 49%,51% -scale 50% _dist/static/seal3.pdf-1.png

### Generate alternative artifacts
for opacity in 05 10 15 20 50 60 70 80; do
    magick _dist/static/seal3.pdf-1.png -alpha Set -channel A -evaluate Multiply "0.$opacity" "_dist/static/seal3.pdf-1.opa$opacity.png"
done

function make_colorized() {
    magick _dist/static/seal3.pdf-1.png -fill "#$2" -colorize 100 "_dist/static/seal3.colorized-$1.png"
}
make_colorized 'red'    'FF0000'
make_colorized 'blue'   '0000FF'


mkdir -p _dist/wwwmisc/static

rsync -av \
  --include 'seal3*' \
  --exclude '*' \
  _dist/static/ _dist/wwwmisc/static/



echo cp _dist/static/seal3.pdf _bincache/seal3.pdf
