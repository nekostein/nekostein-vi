#!/bin/bash

mkdir -p _dist/wwwmisc/nekstfair/logo

function make_img() {
    prefix="_dist/wwwmisc/nekstfair/logo/nekstfair-logo"
    color1="$1"
    color2="$2"
    output_name="$3"
    sed "s|FDFEFF|$color1|g" res/nekstfair.svg | sed "s|111213|$color2|g" > ".tmp/nekstfair.$color1.svg"
    cp -a ".tmp/nekstfair.$color1.svg" "$prefix.$output_name.svg"
    rsvg-convert ".tmp/nekstfair.$color1.svg" -z4 -o "$prefix.$output_name.png"
    convert "$prefix.$output_name.png" -trim "$prefix.$output_name.trim.png"
}

make_img '000000' 'FFFFFF' black
make_img 'FFFFFF' '000000' white
