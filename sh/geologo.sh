#!/bin/bash

mkdir -p _dist/wwwmisc/{geologo,avatar}

function makegeologo() {
    shapecolor="$1"
    bgcolor="$2"
    suffix="$3"
    TMP=".tmp/geologo-$suffix.svg"
    DEST="_dist/wwwmisc/geologo/Nekostein-geologo.$suffix.png"
    sed "s|#BEEF01|$shapecolor|" res/geologo.svg | \
    sed "s|#DEAD02|$bgcolor|" > "$TMP"
    rsvg-convert "$TMP" -o "$DEST" -z 2

    ### Avatar
    convert -size '2200x2200' xc:"$bgcolor" "$DEST" -gravity center -composite "_dist/wwwmisc/avatar/Nekostein-avatar.$suffix.png"
}

makegeologo '#FFFFFF' '#000000' white_black
makegeologo '#000000' '#FFFFFF' black_white
