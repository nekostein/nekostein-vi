#!/bin/bash

case "$1" in
    static/seal1.tex )
        ntex static/seal1-component1.tex
        USE_POPPLER=y DPI=900 ntex static/seal1.tex --png
        magick _dist/static/seal1.pdf-1.png -level 5%,75% _dist/static/seal1.pdf-1.png
        ;;
    static/seal2.tex )
        USE_POPPLER=y DPI=1800 ntex static/seal2.tex --png
        magick _dist/static/seal2.pdf-1.png -level 49%,51% -fuzz 25% -transparent white -level 49%,51% -scale 50% _dist/static/seal2.pdf-1.png
        ;;
esac
