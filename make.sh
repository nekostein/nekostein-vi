#!/bin/bash

mkdir -p _dist _pkg .tmp

case $1 in
    gc)
        find _dist/wwwmisc/patterns -name '.goutputstream*' -delete
        ;;
    sh)
        mkdir -p wwwmisc _dist/wwwmisc
        chmod +x sh/*.sh
        export MASSIVE_MODE=y
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    zip)
        bash "$0" gc
        rm _pkg/Nekostein-VI.zip
        zip -9vr _pkg/Nekostein-VI _dist/wwwmisc -x "_dist/wwwmisc/patterns/*.js.png"
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
        echo '$' git tag "$tagid" ';' git push origin "$tagid"
        echo "url:  https://github.com/nekostein/nekostein-vi/releases/new"
        echo "zip:  $(realpath _pkg/Nekostein-VI.zip)"
        ;;
    local)
        bash sh/000-prepare.sh
        nekostein-installvilib.sh --local
        ;;
    fast)
        bash sh/000-prepare.sh
        bash "$0" zip
        bash "$0" upload
        nekostein-installvilib.sh --local
        ;;
    send)
        ### Send dist to a local directory
        if [[ -e "$2/_dist/libvi/geologo/Nekostein-geologo.white_null.png" ]]; then
            rsync -av _dist/wwwmisc/ "$(realpath "$2/_dist/libvi")/"
        fi
        ;;
    fonts)
        cfoss ~/.fonts/inter-tight/InterTight-Medium.ttf
        ;;
    patterns/js/*.js)
        svgpath="$(sed 's|js|svg|g' <<< "$1")"
        node "$1" > "$svgpath"
        realpath "$svgpath"
        extra_output_prefix="_dist/wwwmisc/patterns/$(basename "$1" | cut -d- -f1)"
        dirname "$extra_output_prefix" | xargs mkdir -p
        case $2 in
            png|pdf)
                rsvg-convert "$svgpath" -f "$2" -z1 -o "$extra_output_prefix.$2"
                realpath "$extra_output_prefix.$2" | xargs du -h
                ;;
        esac
        rsync -av patterns/svg/ _dist/wwwmisc/patterns/
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
