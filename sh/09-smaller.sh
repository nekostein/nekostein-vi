#!/bin/bash

function makeSmaller() {
    fpath="$1"
    resize="$2"
    small_path="_dist/smaller/$(cut -d/ -f3- <<< "$fpath")"
    mkdir -p "$(dirname "$small_path")"
    # echo
    convert "$fpath" -resize "$resize" "$small_path"
}

makeSmaller _dist/wwwmisc/avatar/Nekostein-avatar.white_black.png x1000
makeSmaller _dist/wwwmisc/logocomb/Nekostein-logocombH.black.png 3840x
makeSmaller _dist/wwwmisc/logocomb/Nekostein-logocombH.white.png 3840x
