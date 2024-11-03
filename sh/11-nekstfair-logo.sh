#!/bin/bash

mkdir -p _dist/wwwmisc/nekstfair


function make_nflogo3 () {
    tmp=.tmp/nflogo3.tmp.svg
    cp -a res/nekstfair.svg "$tmp"
    sed -i "s/#000102/$1/" "$tmp"
    rsvg-convert "$tmp" -z10 -o "_dist/wwwmisc/nekstfair/nekstfair.$2.png"
}





make_nflogo3 '#000000' black
make_nflogo3 '#FFFFFF' white
