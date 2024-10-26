#!/bin/bash

mkdir -p _dist/wwwmisc/nekstfair

function make_img() {
    prefix_dir="_dist/wwwmisc/nekstfair/logo/$YEAR"
    mkdir -p "$prefix_dir"
    prefix="$prefix_dir/nekstfair-logo-$YEAR"
    color1="$1"
    color2="$2"
    output_name="$3"
    sed "s|#FDFEFF|$color1|g" res/nekstfair.svg | sed "s|#111213|$color2|g" | sed "s/1453/$YEAR/g" > ".tmp/nekstfair$YEAR.$color1.svg"
    cp -a ".tmp/nekstfair$YEAR.$color1.svg" "$prefix.$output_name.svg"
    rsvg-convert ".tmp/nekstfair$YEAR.$color1.svg" -z2 -o "$prefix.$output_name.png"
    magick -verbose "$prefix.$output_name.png" -trim "$prefix.$output_name.trim.png"
}


function make_img_seq() {
    make_img '#E2D420' 'none'       yellowd_null
    # make_img '#FFFFFF' '#000000'    white
    make_img '#FFFFFF' 'none'       white_null
    # make_img '#000000' '#FFFFFF'    black
    make_img '#000000' 'none'       black_null
}





if [[ -z "$1" ]]; then
    for YEAR in {2025..2026}; do        
        make_img_seq
    done
else
    YEAR="$1"
    make_img_seq
fi


