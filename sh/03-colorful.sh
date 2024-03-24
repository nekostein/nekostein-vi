#!/bin/bash

mkdir -p _dist/colorful

sed "s|#BEEF01|white|" res/geologo.svg | sed "s|#DEAD02|rgba(0,0,0,0)|" > .tmp/f39db4b25dc1.svg
rsvg-convert .tmp/f39db4b25dc1.svg -o .tmp/f39db4b25dc1.png -z 2

function makeColorfulAvatar() {
    bgcolor="$1"
    suffix="$2"
    convert -size '2200x2200' xc:"$bgcolor" .tmp/f39db4b25dc1.png -gravity center -composite "_dist/colorful/avatar.$suffix.png"
}


makeColorfulAvatar '#241468' purple
makeColorfulAvatar '#445069' gray
makeColorfulAvatar '#005CAF' ruri
makeColorfulAvatar '#EAAC19' gold
makeColorfulAvatar '#CA7A2C' amber
