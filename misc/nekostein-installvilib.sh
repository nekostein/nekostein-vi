#!/bin/bash
REPODIR="$PWD"
# ZIPURL="https://pub-714f8d634e8f451d9f2fe91a4debfa23.r2.dev/keep/nekostein-vi/Nekostein-VI.zip--932cd19c36bdde979f5fefbd23876e61.zip"
ZIPURL="https://pub-714f8d634e8f451d9f2fe91a4debfa23.r2.dev/nekostein-vi/8ca76cdc91872ed0150f3182/Nekostein-VI.zip"
mkdir -p _dist/{libvi,libvitmp}
rm -rf _dist/{libvi,libvitmp}
mkdir -p _dist/{libvi,libvitmp}


### Parse argv in a simple way
case " $* " in
  *" -l "* ) USE_LOCAL=y ;;
  *" --local "* ) USE_LOCAL=y ;;
esac


function download_fonts() {
    FONTDIR="_dist/fonts"
    mkdir -p "$FONTDIR"
    cd "$FONTDIR"
    download_font_from_google "https://gwfh.mranftl.com/api/fonts/brygada-1918?download=zip&subsets=greek,latin,latin-ext&variants=500,600,700,regular,italic,500italic,600italic,700italic&formats=ttf"
    download_font_from_google "https://gwfh.mranftl.com/api/fonts/inter-tight?download=zip&subsets=greek,greek-ext,latin,latin-ext&variants=100,200,300,500,600,700,800,900,100italic,200italic,300italic,regular,italic,500italic,600italic,700italic,800italic,900italic&formats=ttf"
    download_font_from_google "https://gwfh.mranftl.com/api/fonts/jetbrains-mono?download=zip&subsets=cyrillic-ext,greek,latin,latin-ext&variants=100,200,300,500,600,700,800,100italic,200italic,300italic,regular,italic,500italic,600italic,700italic,800italic&formats=ttf"
}


function download_font_from_google() {
    FONT_URL="$1"
    curl -o f.zip "$FONT_URL"
    unzip -oq f.zip
    rm f.zip
}


if [[ "$USE_LOCAL" == y ]]; then
    LOCAL_DISTDIR="$(realpath "$0" | xargs dirname | xargs dirname)/_dist/wwwmisc"
    # echo "LOCAL_DISTDIR = $LOCAL_DISTDIR"
    rsync -auv "$LOCAL_DISTDIR/" "$REPODIR/_dist/libvi/"
    rm -rf _dist/libvitmp 2>/dev/null
else
    cd "$REPODIR/_dist/libvitmp"
    wget "$ZIPURL" -O Nekostein-VI.zip
    unzip Nekostein-VI.zip
    rm *.zip
    cd "$REPODIR"
    rsync -auvpx --delete _dist/libvitmp/_dist/wwwmisc/ _dist/libvi/
    rm -rf _dist/libvitmp
    # download_fonts
fi

