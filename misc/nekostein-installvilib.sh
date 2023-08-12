#!/bin/bash
ZIPURL="https://pub-714f8d634e8f451d9f2fe91a4debfa23.r2.dev/keep/nekostein-vi/Nekostein-VI.zip--932cd19c36bdde979f5fefbd23876e61.zip"
mkdir -p _dist/libvi
rm -rf _dist/libvi
mkdir -p _dist/libvi
cd _dist/libvi
wget "$ZIPURL" -O Nekostein-VI.zip
unzip Nekostein-VI.zip
