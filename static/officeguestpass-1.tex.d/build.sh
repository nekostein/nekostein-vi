#!/bin/bash


node static/officeguestpass-1.tex.d/pattern-001.js
rsvg-convert static/officeguestpass-1.tex.d/pattern-001.js.svg --format=pdf -h 3000 -o static/officeguestpass-1.tex.d/pattern-001.js.pdf
rsvg-convert static/officeguestpass-1.tex.d/pattern-001.js.svg -h 3000 -o static/officeguestpass-1.tex.d/pattern-001.js.png

DPI=900 USE_POPPLER=n ntex static/officeguestpass-1.tex --png


# File paths:
#   _dist/static/officeguestpass-1.pdf-1.png
#   .tmp/officeguestpass-front.png


# Rouzao file path:
#   /home/neruthes/EWS/nekostein/meta/nekostein-vi/static/officeguestpass-1.tex.d/pattern-001.js.png
#   /home/neruthes/EWS/nekostein/meta/nekostein-vi/.tmp/officeguestpass-front.png (deprecated)

# Make Rouzao-compatible transparent...
magick _dist/static/officeguestpass-1.pdf-0.png -colors 2 -fuzz 45% -transparent white .tmp/officeguestpass-front.png
# magick _dist/static/officeguestpass-1.pdf-1.png -colors 2 -fuzz 45% -transparent white .tmp/officeguestpass-back.png


cp static/officeguestpass-1.tex.d/pattern-001.js.png .tmp/officeguestpass-back.png

