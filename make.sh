#!/bin/bash

mkdir -p _dist _pkg .tmp

case "$1" in
    gc)
        find . -name '.goutputstream*' -delete
        ;;
    latexlib/)
        bash sh/01-texlib.sh
        ;;
    sh | sh/)
        mkdir -p wwwmisc _dist/wwwmisc
        chmod +x sh/*.sh
        export MASSIVE_MODE=y
        for i in sh/*.sh; do
            bash "$i"
        done
        ;;
    zip)
        ./make.sh gc
        rm _pkg/Nekostein-VI.zip
        zip -9vr _pkg/Nekostein-VI _dist/wwwmisc -x "_dist/wwwmisc/patterns/*.js.png"
        du -h _pkg/*
        ;;
    up|upload)
        cfoss2 _pkg/Nekostein-VI.zip
        ;;
    install|ins)
        ln -svf "$PWD/misc/nekostein-installvilib.sh" "$HOME/.local/bin/nekostein-installvilib.sh"
        ;;
    rel|release|tag)
        tagid="snapshot-$(TZ=UTC date +%Y%m%d)"
        echo '$' git tag "$tagid" ';' git push origin "$tagid"
        echo "url:  https://github.com/nekostein/nekostein-vi/releases/new"
        echo "zip:  $(realpath _pkg/Nekostein-VI.zip)"
        ;;
    local | ci)
        bash sh/000-prepare.sh
        ./make.sh zip
        nekostein-installvilib.sh --local
        ;;
    fast)
        bash sh/000-prepare.sh
        ./make.sh zip
        ./make.sh upload
        nekostein-installvilib.sh --local
        ;;
    send)
        ### Send dist to a local directory
        if [[ -e "$2/_dist/libvi/geologo/Nekostein-geologo.white_null.png" ]]; then
            rsync -av _dist/wwwmisc/ "$(realpath "$2/_dist/libvi")/"
        fi
        ;;
    fonts)
        exit 0
        ;;
    patterns/js/*.js)
        svgpath="$(sed 's|js|svg|g' <<< "$1")"
        node "$1" > "$svgpath"
        realpath "$svgpath"
        extra_output_prefix="_dist/wwwmisc/patterns/$(basename "$1" | cut -d- -f1)"
        dirname "$extra_output_prefix" | xargs mkdir -p
        case "$2" in
            png|pdf|eps)
                rsvg-convert "$svgpath" -f "$2" -z1 -o "$extra_output_prefix.$2"
                realpath "$extra_output_prefix.$2" | xargs du -h
                ;;
        esac
        rsync -av patterns/svg/ _dist/wwwmisc/patterns/
        ;;
    *.typ )
        PPI=600 TYPST_FONT_PATHS=. typst c --root . "$1" --input USE_NOTO=1 $TYPST_EXTRA_ARGS
        pdf_path="${1/.typ/.pdf}"
        if [[ -e "$pdf_path" ]]; then
            dirname "_dist/$pdf_path" | xargs mkdir -p &&
            mv "$pdf_path" "_dist/$pdf_path" &&
            realpath "_dist/$pdf_path" | xargs du -h
        fi
        ;;
    all | '')
        ./make.sh sh
        ./make.sh $(ls wwwmisc/*/*.tex)
        ntex static/*.tex static/stage{2..3}/*.tex # Not really required for creating other stuff
        ./make.sh zip
        ./make.sh install
        nekostein-installvilib.sh -l
        ;;
    *)
        echo "No explicit rule for '$1'; attempting 'recipe.sh'..."
        bash recipe.sh "$1"
        ;;
esac



