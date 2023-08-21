#!/bin/bash

mkdir -p _dist/wwwmisc/logocomb

# Set the filenames
geo_file="_dist/wwwmisc/geologo/Nekostein-geologo.white_null.png"
word_file="_dist/wwwmisc/wordmark/Nekostein-logo.white.png"
word_file2=".tmp/Nekostein-logo.white.word_file2H.png"
output_file="_dist/wwwmisc/logocomb/Nekostein-logocombH.white.png"


gap=560
extra_y_offset=20


convert $word_file -resize x580 $word_file2

# Get the dimensions of the input images
geo_W=$(identify -format "%w" "$geo_file")
geo_H=$(identify -format "%h" "$geo_file")
word_W=$(identify -format "%w" "$word_file2")
word_H=$(identify -format "%h" "$word_file2")


canvas_H=$geo_H
canvas_W=$(( geo_W + word_W + gap ))
word_Xoffset=$(( geo_W + gap ))
word_Yoffset=$(( (geo_H-word_H) / 2 + extra_y_offset ))

magick -size ${canvas_W}x${canvas_H} xc:none -alpha transparent .tmp/canvas.png
magick .tmp/canvas.png $geo_file -geometry +0+0 -composite .tmp/canvas.png
magick .tmp/canvas.png $word_file2 -geometry +${word_Xoffset}+${word_Yoffset} -composite "$output_file"

file "$output_file"



