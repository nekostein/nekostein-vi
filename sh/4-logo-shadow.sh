#!/bin/bash



mkdir -p _dist/wwwmisc/logo-shadow


function make_image() {
    input_img="$(realpath "$1")"
    shadow_color="$2"
    output_path="_dist/wwwmisc/logo-shadow/$(sed 's/png.shadow/shadow.png/' <<< "$(basename "$input_img").shadow")"

    echo "Generating shadowed version for: $input_img"

    cd .tmp

    TMP="$(basename "$input_img").tmp"



    ### Calculate sizes
    image_size="$(identify -format '%w' "$input_img")"
    image_sizeH="$(identify -format '%h' "$input_img")"
    if [[ "$image_sizeH" -lt "$image_size" ]]; then
        image_size="$image_sizeH"
    fi
    shadow_size=$(( image_size/9 ))
    padding_size=$(( image_size/9 + 15 ))

    ### Add transparent border
    convert "$input_img" -bordercolor none -border "$padding_size" "$TMP.border.png"

    ### Colorize
    convert "$TMP.border.png" -fill "$shadow_color" -colorize 100% "$TMP.preshadow.png"




    ### Gaussian blur
    convert "$TMP.preshadow.png" -blur ${shadow_size}x${shadow_size} "$TMP.LOGO_shadow_bg.png"

    ### Reduce opacity for shadow layer
    convert "$TMP.LOGO_shadow_bg.png" -channel A -evaluate Multiply 0.2 "$TMP.LOGO_shadow_bg.png"


    composite -geometry +0-10 "$TMP.border.png" "$TMP.LOGO_shadow_bg.png" "$TMP.final.png"
    convert "$TMP.final.png" -trim "$TMP.final.png"

    cd ..
    cp -av .tmp/"$TMP.final.png" "$output_path"
}



# make_image _dist/wwwmisc/logocomb/Nekostein-logocombV.white.png '#000000' &

make_image _dist/wwwmisc/logocomb/Nekostein-logocombH.white.png '#000000'
make_image _dist/wwwmisc/logocomb/Nekostein-logocombH.black.png '#FFFFFF'

# make_image _dist/wwwmisc/geologo/Nekostein-geologo.white_null.png '#000000' &
# make_image _dist/wwwmisc/geologo/Nekostein-geologo.black_null.png '#FFFFFF' &

# wait
