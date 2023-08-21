#!/bin/bash

mkdir -p _dist _pkg

case $1 in
    sh)
        mkdir -p wwwmisc _dist/wwwmisc
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    zip)
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
        echo "url:  https://github.com/nekostein/nekostein-vi/releases/new"
        echo "zip:  $(realpath _pkg/Nekostein-VI.zip)"
        tagid="snapshot-$(TZ=UTC date +%Y%m%d)"
        echo '$' git tag "$tagid"
        echo '$' git push origin "$tagid"
        # find _dist/ -type f | sort | grep -v misc.tar | cut -d/ -f3-
        ;;
    ''|*)
        bash "$0" sh
        bash "$0" zip
        bash "$0" upload
esac
