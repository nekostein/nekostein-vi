#!/bin/bash

mkdir -p _dist/wwwmisc/{geologo,avatar}

function makegeologo() {
    shapecolor="$1"
    bgcolor="$2"
    suffix="$3"
    prefix="$4"
    mkdir -p "_dist/$prefix"/{geologo,avatar}
    TMP=".tmp/geologo-$suffix.svg"
    DEST="_dist/$prefix/geologo/Nekostein-geologo.$suffix.png"
    sed "s|#BEEF01|$shapecolor|" res/geologo.svg | \
        sed "s|#DEAD02|$bgcolor|" > "$TMP"
    rsvg-convert "$TMP" -o "$DEST" -z 2

    ### Avatar
    convert -size '2200x2200' xc:"$bgcolor" "$DEST" -gravity center -composite "_dist/$prefix/avatar/Nekostein-avatar.$suffix.png"
}

makegeologo '#FFFFFF' '#000000' white_black wwwmisc
makegeologo '#D3E9CA' '#0E497E' D3E9CA_0E497E wwwmisc

makegeologo '#000000' '#FFFFFF' black_white doc-example


### Rounded avatar
convert -size 2200x2200 xc:none -fill white -draw "roundrectangle 0,0,2200,2200,387,387" .tmp/rdsqmask.png
convert _dist/wwwmisc/avatar/Nekostein-avatar.white_black.png .tmp/rdsqmask.png -alpha off -compose copy_opacity -composite _dist/wwwmisc/avatar/Nekostein-avatar.white_black.rounded.png



### Transparent geologo
function makeTransparentGeologo() {
    colorcode="$1"
    colorname="$2"
    sed "s|#BEEF01|$colorcode|" res/geologo.svg | \
        sed "s|#DEAD02|rgba(0,0,0,0)|" > _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.svg
    rsvg-convert -z 2 _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.svg -o _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.png
    rsvg-convert -z 4 _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.svg -o _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.4x.png
    rsvg-convert -z 8 _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.svg -o _dist/wwwmisc/geologo/Nekostein-geologo.${colorname}_null.8x.png
}

makeTransparentGeologo '#FFFFFF' white
makeTransparentGeologo '#000000' black



### And finally make circle cropped avatar...
magick _dist/wwwmisc/avatar/Nekostein-avatar.white_black.png -bordercolor black -border 200 +repage -alpha set -background none \( +clone -alpha extract -draw "circle %[fx:w/2],%[fx:h/2] %[fx:w/2],1" -blur 0x2 -threshold 50% -channel A -negate +channel \) -compose CopyOpacity -level 49%,51% -composite _dist/wwwmisc/avatar/Nekostein-avatar.white_black.circ.png
magick _dist/wwwmisc/avatar/Nekostein-avatar.white_black.circ.png -channel RGB -negate -level 49%,51% _dist/wwwmisc/avatar/Nekostein-avatar.black_white.circ.png
