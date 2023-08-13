#!/bin/bash

mkdir -p _dist _pkg

case $1 in
    sh)
        mkdir -p wwwmisc _dist/wwwmisc
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    pkg)
        zip -9vr _pkg/Nekostein-VI _dist
        du -h _pkg/*
        ;;
    up|upload)
        cfoss _pkg/Nekostein-VI.zip
        minoss _pkg/Nekostein-VI.zip
        ;;
    install|ins)
        ln -svf "$PWD/misc/nekostein-installvilib.sh" "$HOME/.local/bin/nekostein-installvilib.sh"
        ;;
    ''|*)
        echo "Targets:   sh  pkg"
esac
