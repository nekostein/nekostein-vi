#!/bin/bash

mkdir -p _dist/wwwmisc/logocomb

# Set the filenames
geo_file="_dist/wwwmisc/geologo/Nekostein-geologo.white_null.png"
word_file="_dist/wwwmisc/wordmark/Nekostein-logo.white.png"
word_file2=".tmp/Nekostein-logo.white.word_file2V.png"
output_file="_dist/wwwmisc/logocomb/Nekostein-logocombV.white.png"


shrink=100
gap=200


# Get the dimensions of the input images
geo_W="$(identify -format "%w" "$geo_file")"
geo_H="$(identify -format "%h" "$geo_file")"
convert "$word_file" -resize "$(( geo_W - shrink ))x" "$word_file2"
word_W="$(identify -format "%w" "$word_file2")"
word_H="$(identify -format "%h" "$word_file2")"


canvas_W="$geo_W"
canvas_H="$(( geo_H + word_H + gap ))"
word_Xoffset="$(( shrink / 2 ))"
word_Yoffset="$(( geo_H + gap ))"

magick -size "${canvas_W}x${canvas_H}" xc:none -alpha transparent .tmp/canvas-combV.png
magick .tmp/canvas-combV.png $geo_file -geometry +0+0 -composite .tmp/canvas-combV.png
magick .tmp/canvas-combV.png $word_file2 -geometry "+${word_Xoffset}+${word_Yoffset}" -composite "$output_file"


file "$output_file"


convert -size 2200x2200 xc:black -gravity center "$output_file" -composite _dist/wwwmisc/logocomb/Nekostein-logocombV-padded.white_black.png



TYPST_EXTRA_ARGS="--pdf-standard a-2b" ./make.sh res/logocombV.circ_black.typ
cp _dist/res/logocombV.circ_black.pdf _dist/wwwmisc/logocomb/Nekostein-logocombV.circ_black.pdf
DPI=600 gspdftopng _dist/wwwmisc/logocomb/Nekostein-logocombV.circ_black.pdf
