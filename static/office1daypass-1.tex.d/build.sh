#!/bin/bash


node static/office1daypass-1.tex.d/pattern-001.js
rsvg-convert static/office1daypass-1.tex.d/pattern-001.js.svg --format=pdf -h 3000 -o static/office1daypass-1.tex.d/pattern-001.js.pdf

DPI=900 USE_POPPLER=n ntex static/office1daypass-1.tex --png


# File paths:
#   _dist/static/office1daypass-1.pdf-1.png
#   .tmp/office1daypass-front.png


# Rouzao file path:
#   /home/neruthes/EWS/nekostein/meta/nekostein-vi/.tmp/office1daypass-front.png

# Make Rouzao-compatible transparent...
magick _dist/static/office1daypass-1.pdf-0.png -colors 2 -fuzz 45% -transparent white .tmp/office1daypass-front.png
magick _dist/static/office1daypass-1.pdf-1.png -colors 2 -fuzz 45% -transparent white .tmp/office1daypass-back.png

