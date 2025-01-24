#!/bin/bash

[[ -z "$GRAVITY" ]] && GRAVITY=center
[[ -z "$ADD_DECO" ]] && ADD_DECO=y


DECORATION="_dist/libvi/decorations/postcard1deco.pdf.png"

# Define the input and output file names
PHOTO="$1"
MASK="_dist/libvi/extra-res/postcard1mask.png"
OUTPUT="_dist/postcard1/$(cut -d. -f1 <<< "$1")"
mkdir -p "$(dirname "$OUTPUT")" .tmp
PHOTOTMP=".tmp/PHOTOTMP.png"

if [[ "$ADD_DECO" != y ]]; then
    OUTPUT="$OUTPUT.nodeco"
fi
OUTPUT="$OUTPUT.png"



# Step 1: Resize PHOTO.png to match the dimensions of MASK.png, preserving aspect ratio and cropping excess
# Get the dimensions of MASK.png
MASK_WIDTH=$(identify -format "%w" "$MASK")
MASK_HEIGHT=$(identify -format "%h" "$MASK")

# Resize PHOTO.png to match the dimensions of MASK.png, preserving aspect ratio and cropping excess
convert -verbose "$PHOTO" -resize "${MASK_WIDTH}x${MASK_HEIGHT}^" -gravity "$GRAVITY" -extent "${MASK_WIDTH}x${MASK_HEIGHT}" "$PHOTOTMP"
if [[ "$(grep .crop.png <<< "$PHOTO")" == '' ]]; then
    cp "$PHOTOTMP" "$PHOTO.crop.png"
fi


# Step 2: Use the resized image and MASK.png to create the final masked image
# Use ImageMagick's -compose option to apply the mask
magick convert -verbose "$PHOTOTMP" "$MASK" -compose CopyOpacity -composite "$OUTPUT"

if [[ "$ADD_DECO" == y ]]; then
    composite -verbose "$OUTPUT" "$DECORATION" "$OUTPUT"
fi

if [[ "$TRIM" == y ]]; then
    convert "$OUTPUT" -trim "$OUTPUT"
fi

# Clean up the temporary file
rm "$PHOTOTMP"

echo "Task completed. The output is saved as $OUTPUT."
