#!/bin/bash

function makeLogo() {
    # Set the text to be rendered and the font properties
    local text="NEKOSTEIN"
    local font="$HOME/.fonts/Brygada1918/Brygada1918-Bold.ttf"
    local fontSize=700
    local letterSpacing=70

    # Set the input and output file names
    local inputFile="_dist/wwwmisc/wordmark/tmp--Nekostein-logo.$2.png"
    local outputFilePrefix="_dist/wwwmisc/wordmark/Nekostein-logo.$2"

    # Generate the input image with the transparent background and specified color
    convert -size '5000x1200' xc:none -gravity center \
    -font "$font" -pointsize $fontSize -kerning $letterSpacing \
    -fill "$1" -draw "text 50,50 '$text'" "$inputFile"

    # Trim the unused pixels around the text and save the output image
    convert "$inputFile" -trim "$outputFilePrefix.png"

    # Delete the intermediate input image
    rm "$inputFile"
}

function makeSquare() {
    textcolor="$1"
    bgcolor="$2"
    convert "_dist/wwwmisc/wordmark/Nekostein-logo.$textcolor.png" -resize 2200x ".tmp/logo_resized.$textcolor.png"
    convert -size 3000x3000 xc:"$bgcolor" ".tmp/canvas-$bgcolor.png"
    convert ".tmp/canvas-$bgcolor.png" ".tmp/logo_resized.$textcolor.png" \
        -gravity center -composite "_dist/wwwmisc/wordmark/Nekostein-logo-square.$bgcolor.png"
}




mkdir -p _dist/wwwmisc/wordmark

makeLogo "#000000" "black" &
makeLogo "#FFFFFF" "white" &
wait

file _dist/wwwmisc/wordmark/Nekostein-logo.*


makeSquare white black &
makeSquare black white &
wait

file _dist/wwwmisc/wordmark/Nekostein-logo-square.*
