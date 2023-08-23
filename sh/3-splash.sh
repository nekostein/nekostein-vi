#!/bin/bash

ntex wwwmisc/splash/*.tex

for fn in _dist/wwwmisc/splash/Nekostein-splash.*.pdf; do
    echo "fn = $fn"
    convert -density 300 "$fn" "$fn.png"
    convert "$fn.png" -resize x2160 "$fn.png"
    file "$fn.png"
done
