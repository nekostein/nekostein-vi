#!/bin/bash

echo "[INFO] This script will render pattern SVGs into PNGs en masse."
echo "[INFO] Some fonts may be needed."



missing_fonts=""

function makepng() {
    pngpath="$(sed 's|.svg$|.js.png|g' <<< "$1")"
    rsvg-convert "$1" -o "$pngpath"
    jpgpath_prefix="$(sed 's|.svg$||g' <<< "$1")"
    convert "$pngpath" -quality 83 -background white -alpha remove -alpha off "$jpgpath_prefix.jpg"
    convert "$jpgpath_prefix.jpg" -scale '33%' "$jpgpath_prefix.small.jpg"
}

function checkfonts() {
    fonts="$(grep font-family= "$1" | grep -Eo 'font-family=".+?" ' | cut -d'"' -f2 | uniq)"
    if [[ -n "$fonts" ]]; then
        echo "[INFO] $1 needs these fonts: $fonts"
        while read -r fontarr; do
            font1="$(cut -d, -f1 <<< "$fontarr")"
            # echo "fonts=$fonts"
            # echo "font1=$font1"
            if ! grep -sq "$font1" <(fc-match "$font1"); then
                echo "[WARNING] $1 needs font <$font1> but it is not available!"
                missing_fonts="$font1 , $missing_fonts"
            fi
        done <<< "$fonts"
    fi
    grep 'font-family:' "$1"
}

while read -r svgpath; do
    checkfonts "$svgpath"
    makepng "$svgpath"
done < <(find _dist/libvi/patterns/*.svg)


[[ -n "$missing_fonts" ]] && echo "[ERROR] Need these fonts: $missing_fonts"
