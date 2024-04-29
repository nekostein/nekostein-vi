#!/bin/bash


mkdir -p _dist/wwwmisc/distutils
rsync -av --delete distutils/ _dist/wwwmisc/distutils/

mkdir -p _dist/wwwmisc/latex
rsync -av --delete latexlib/ _dist/wwwmisc/latex/



mkdir -p _dist/wwwmisc/extra-res
rsync -a res/ _dist/wwwmisc/extra-res/




