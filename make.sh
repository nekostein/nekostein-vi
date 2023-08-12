#!/bin/bash

mkdir -p _dist _pkg

case $1 in
    sh)
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    pkg)
        zip -9vr _pkg/Nekostein-VI _dist
        du -h _pkg/*
        ;;
    install|ins)
        ln -svf "$PWD/misc/nekostein-installvilib.sh" "$HOME/.local/bin/nekostein-installvilib.sh"
        ;;
    ''|*)
        echo "Targets:   sh  pkg"
esac
