#!/bin/bash

echo "[INFO] This script will render pattern SVGs into PNGs en masse."
echo "[INFO] Some fonts may be needed."



missing_fonts=""

function makepng() {
    pngpath="$(sed 's|.svg$|.js.png|g' <<< "$1")"
    echo rsvg-convert "$1" -o "$pngpath"
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

find _dist/libvi/patterns/*.svg | while read -r svgpath; do
    checkfonts "$svgpath"
    makepng "$svgpath"
done


[[ -n "$missing_fonts" ]] && echo "[ERROR] Need these fonts: $missing_fonts"
