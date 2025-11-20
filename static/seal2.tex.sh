#!/bin/bash


ntex static/seal2.tex

function make_colorized() {
    magick _dist/static/seal2.pdf-1.png -fill "#$2" -colorize 100 "_dist/static/seal2.colorized-$1.png"
}
make_colorized 'red'    'FF0000'
make_colorized 'blue'   '0000FF'
