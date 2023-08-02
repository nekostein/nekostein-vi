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
    ''|*)
        echo "Targets:   sh  pkg"
esac
