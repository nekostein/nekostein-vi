#!/bin/bash


rsync -auvpx --delete --mkpath distutils/ _dist/wwwmisc/distutils/

rsync -auvpx --delete --mkpath latexlib/ _dist/wwwmisc/latex/


rsync -auvpx --mkpath res/ _dist/wwwmisc/extra-res/




