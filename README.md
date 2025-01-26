# Nekostein - Visual Identity

This repository contains corporate visual identity materials of Nekostein.


Read [Nekostein VI Manual](https://nekostein-wwwmisc.pages.dev/vi/doc/Nekostein_VI.pdf) before downloading.
And make sure that you follow the instructions included in the manual.



## Download ZIP Archive

Try any of the following links.

- [Link 1](https://pub-714f8d634e8f451d9f2fe91a4debfa23.r2.dev/keep/nekostein-vi/Nekostein-VI.zip--932cd19c36bdde979f5fefbd23876e61.zip).
- [Link 2](https://minio.neruthes.xyz/oss/keep/nekostein-vi/Nekostein-VI.zip--932cd19c36bdde979f5fefbd23876e61.zip).

Or navigate to the [latest release](https://github.com/nekostein/nekostein-vi/releases/latest) of this repository.



## Install VI Lib

Run `./make.sh install` to install the installer script.

Run `nekostein-installvilib.sh` in another repository to install the latest VI library into `/_dist/libvi`.

Alternatively, run `nekostein-installvilib.sh --local` to rsync from the local repository.
Make sure to run a full local build of the VI lib before doing this.



## Extra Techniques

### Using TeX Live with Docker

Save the following script as `~/.local/bin/xelatex-docker`.

```sh
#!/bin/bash
docker run --rm -v "$PWD":/workdir -v "/usr/share/fonts":/root/.fonts registry.gitlab.com/islandoftex/images/texlive:latest xelatex "$@"
```

Set up `XELATEX_CMDNAME=xelatex-docker` environment variable.



## Developer Notes

- `/latexlib`: Portable LaTeX library.
- `/distutils`: Scripts that lib users may need when making assets.
- `/misc`: Scripts and other stuff that lib developers use.
- `/wwwmisc`: Stuff to publish on misc.nekostein.com website.
- `/static`: Pre-made asset to be used independently.
- `/platform`: Marketing assets tailored for specific platforms.
- `/altdocs`: Documents that will hardly be used by anyone.





## Copyright

Copyright (c) 2023-2025 Nekostein. All rights reserved.

Nekostein is an unincorporated game development team consisting of Neruthes and MIAO_OAIM.
