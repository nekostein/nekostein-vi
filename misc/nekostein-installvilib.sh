#!/bin/bash
REPODIR="$PWD"
ZIPURL="https://pub-714f8d634e8f451d9f2fe91a4debfa23.r2.dev/keep/nekostein-vi/Nekostein-VI.zip--932cd19c36bdde979f5fefbd23876e61.zip"
mkdir -p _dist/{libvi,libvitmp}
rm -rf _dist/{libvi,libvitmp}
mkdir -p _dist/{libvi,libvitmp}
cd "$REPODIR/_dist/libvitmp"
wget "$ZIPURL" -O Nekostein-VI.zip
unzip Nekostein-VI.zip
rm *.zip

cd "$REPODIR"
rsync -av --delete _dist/libvitmp/_dist/wwwmisc/ _dist/libvi/
rm -rf _dist/libvitmp
