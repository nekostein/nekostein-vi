#!/bin/bash

makeLogo() {
    # Set the text to be rendered and the font properties
    local text="NEKOSTEIN"
    local font="$HOME/.fonts/Brygada1918/Brygada1918-Bold.ttf"
    local fontSize=700
    local letterSpacing=70

    # Set the input and output file names
    local inputFile="_dist/wwwmisc/logo/tmp--Nekostein-logo.$2.png"
    local outputFilePrefix="_dist/wwwmisc/logo/Nekostein-logo.$2"

    # Generate the input image with the transparent background and specified color
    convert -size '5000x1200' xc:none -gravity center \
    -font "$font" -pointsize $fontSize -kerning $letterSpacing \
    -fill "$1" -draw "text 50,50 '$text'" "$inputFile"

    # Trim the unused pixels around the text and save the output image
    convert "$inputFile" -trim "$outputFilePrefix.png"

    # Delete the intermediate input image
    rm "$inputFile"
}

mkdir -p _dist/wwwmisc/logo

makeLogo "#000000" "black" &
makeLogo "#FFFFFF" "white" &

wait

file _dist/wwwmisc/logo/Nekostein-logo.*
