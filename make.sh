#!/bin/bash

mkdir -p _dist _pkg .tmp

case $1 in
    sh)
        mkdir -p wwwmisc _dist/wwwmisc
        chmod +x sh/*.sh
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    zip)
        rm _pkg/Nekostein-VI.zip
        zip -9vr _pkg/Nekostein-VI _dist/wwwmisc
        du -h _pkg/*
        ;;
    up|upload)
        cfoss _pkg/Nekostein-VI.zip
        minoss _pkg/Nekostein-VI.zip
        ;;
    install|ins)
        ln -svf "$PWD/misc/nekostein-installvilib.sh" "$HOME/.local/bin/nekostein-installvilib.sh"
        ;;
    rel|release)
        tagid="snapshot-$(TZ=UTC date +%Y%m%d)"
        echo '$' git tag "$tagid"
        echo '$' git push origin "$tagid"
        echo "url:  https://github.com/nekostein/nekostein-vi/releases/new"
        echo "zip:  $(realpath _pkg/Nekostein-VI.zip)"
        ;;
    fast)
        bash sh/1-texlib.sh
        bash "$0" zip
        bash "$0" upload
        nekostein-installvilib.sh
        ;;
    '')
        bash "$0" zip
        bash "$0" upload
        bash "$0" release
        nekostein-installvilib.sh
        ;;
    *)
        echo "[ERROR] Invalid target"
        ;;
esac
