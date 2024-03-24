#!/bin/bash

mkdir -p _dist/wwwmisc/latex

rsync -av --delete latexlib/ _dist/wwwmisc/latex/
