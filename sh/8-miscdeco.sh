#!/bin/bash

destdir="_dist/wwwmisc/decoration"

mkdir -p "$destdir"



function makeDeco1_cropTR() {
    color="$1"
    width_old=6400
    width_new=2400
    height_new=1500
    imgsrc="_dist/wwwmisc/geologo/Nekostein-geologo.${color}_null.8x.png"
    sizespec="${width_new}x${height_new}+$((width_old-width_new))+0"
    tmp=".tmp/cropped_Logo.$color.png"
    convert "$imgsrc" -crop "$sizespec" +repage "$tmp"
    convert -size "${width_new}x${height_new}" xc:none "$tmp-canvas.png"
    convert "$tmp" -channel A -fx 'a*0.2' "$tmp-20.png"
    composite -gravity center "$tmp-20.png" "$tmp-canvas.png" "$destdir/geodeco-crop.tr.$color.png"
    echo "$destdir/geodeco-crop.tr.$color.png"
    rm "$tmp" "$tmp-"*

}

makeDeco1_cropTR black
makeDeco1_cropTR white
