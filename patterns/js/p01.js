const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const COLOR_DECO = '#BBC4F3';
const COLOR1 = `#AAAAAA`;
const COLOR2 = `#EEEEEE`;

let SVG_DEFS = '';
let SVG_CONTENTS_OVERLAY = '';
let SVG_CONTENTS_INNER = '';
let SVG_CONTENTS_OUTER = '';


let EMBEDED_LOGO = fs.readFileSync('res/geologo-outline.svg').toString();



// Basic texture background
SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const MAXCOUNT = 70;
    for (let itr = 0; itr < MAXCOUNT; itr++) {
        const ROTATE = itr / MAXCOUNT * 360;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none', 'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = -Math.cos(ROTATE_rad * 12);
                const raw_length = 400 + Math.cos(theta_rad * 12) * (140 + linear_fix * 11) + linear_fix * 0;
                return raw_length;
            }
        });
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none', 'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = -Math.cos(ROTATE_rad * 12);
                const raw_length = 650 + Math.cos(theta_rad * 12) * (100 + linear_fix * 15) + linear_fix * 4;
                return raw_length;
            }
        });
    };
    return tmpstr;
})();



// Center container rings
SVG_CONTENTS_INNER += svgplotlib.drawpolarcircle({ // Outer
    attrs: {
        'fill': 'white', 'stroke': COLOR2,
        'transform': `scale(6)`
    },
    func: function (theta_rad) {
        return (268 + Math.cos((theta_rad) * 12) * -8) * 0.6666666667;
    }
});
SVG_CONTENTS_INNER += svgplotlib.drawpolarcircle({ // Inner
    attrs: {
        'fill': 'white', 'stroke': COLOR2,
        'transform': `scale(4)`
    },
    func: function (theta_rad) {
        return 263 + Math.cos((theta_rad) * 12) * -8;
    }
});


SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const MAXCOUNT = 62;
    for (let itr = 0; itr < MAXCOUNT; itr++) {
        const ROTATE = itr / MAXCOUNT * 360;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none', 'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                return 245 + Math.cos(theta_rad * 12) * 45 + Math.cos(ROTATE_rad * 12) * -9;
            }
        });
    };
    return tmpstr;
})();

SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const MAXCOUNT = 46;
    for (let itr = 0; itr < MAXCOUNT; itr++) {
        const ROTATE = itr / MAXCOUNT * 360;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none', 'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                return 147 + Math.cos(theta_rad * 12) * 45 + Math.cos(ROTATE_rad * 12) * 9;
            }
        });
    };
    return tmpstr;
})();
SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const MAXCOUNT = 22;
    for (let itr = 0; itr < MAXCOUNT; itr++) {
        const ROTATE = itr / MAXCOUNT * 360;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none',
                'stroke': COLOR_DECO,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = -Math.cos(ROTATE_rad * 12);
                const raw_length = 56 + Math.cos(theta_rad * 12) * (36 + linear_fix * 5) + linear_fix * 4;
                return raw_length;
            }
        });
    };
    return tmpstr;
})();





// Border decoration component
const border_deco_c1 = (function () {
    let grandtmpstr = '';
    // grandtmpstr += svgplotlib.drawpolarcircle({ // Wrapper
    //     attrs: {
    //         'fill': '#E4E4E4',
    //         'stroke': `#000000`,
    //         'transform': `scale(4)`
    //     }, func: function (theta_rad) {
    //         const raw_length = 64 + Math.cos(theta_rad * 8) * 7.5;
    //         return raw_length;
    //     }
    // });
    grandtmpstr += (function () {
        let tmpstr_low = '';
        let tmpstr_high = '';
        let MAXCOUNT = 18;
        for (let itr = 0; itr < MAXCOUNT; itr++) {
            const ROTATE = itr / MAXCOUNT * 360;
            const stdfunc1 = function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = -Math.cos(ROTATE_rad * 8);
                const raw_length = 69 + Math.cos(theta_rad * 8) * (13 + linear_fix * -4) + linear_fix * 1;
                return raw_length;
            };
            tmpstr_low += svgplotlib.drawpolarcircle({ // Background
                attrs: {
                    'fill': 'white', 'stroke': `none`,
                    'transform': `scale(3) rotate(${ROTATE})`
                }, func: stdfunc1
            });
            tmpstr_high += svgplotlib.drawpolarcircle({ // Real strokes
                attrs: {
                    'fill': 'none', 'stroke': COLOR1,
                    'transform': `scale(3) rotate(${ROTATE})`
                }, func: stdfunc1
            });
        };
        MAXCOUNT = 14;
        // Smaller ring
        for (let itr = 0; itr < MAXCOUNT; itr++) {
            const ROTATE = itr / MAXCOUNT * 360;
            tmpstr_high += svgplotlib.drawpolarcircle({ // Inner small
                attrs: {
                    'fill': 'none', 'stroke': COLOR_DECO,
                    'transform': `scale(3) rotate(${ROTATE})`
                }, func: function (theta_rad) {
                    const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                    const linear_fix = -Math.cos(ROTATE_rad * 8);
                    const raw_length = 30 + Math.cos(theta_rad * 8) * (18 + linear_fix * -2) + linear_fix * -2;
                    return raw_length;
                }
            });
        }
        // And another flower
        MAXCOUNT = 16;
        for (let itr = 0; itr < MAXCOUNT; itr++) {
            const ROTATE = itr / MAXCOUNT * 360;
            const myfunc2 = function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = Math.cos(ROTATE_rad * 6);
                const raw_length = 25 + Math.cos(theta_rad * 6) * (17 + linear_fix * 1.5) + linear_fix * 1.5;
                // return raw_length;
                return 4;
            }
            tmpstr_high += svgplotlib.drawpolarcircle({
                attrs: {
                    'fill': 'none',
                    'stroke': 'white',
                    'transform': `scale(4) rotate(${ROTATE})`
                }, func: myfunc2
            });
        };
        return tmpstr_low + tmpstr_high;
    })();
    return grandtmpstr;
})();
SVG_DEFS += `<g id="border_deco_c1">${border_deco_c1}</g>`;
SVG_DEFS += `<mask id="border_deco_mask">
    <rect x="-80" y="-500" width="160" height="501" fill="white" stroke="none" />
</mask>`;
// SVG_DEFS += `<g id="border_deco_c2" mask="url(#border_deco_mask)">${border_deco_c1}</g>`;
SVG_DEFS += `<g id="border_deco_c2" mask="url(#border_deco_mask)">
    <use href="#border_deco_c1" x="0" y="0" />
</g>`;
SVG_DEFS += `<g id="border_deco_longborder">
    ${(function () {
        let tmpstr = '';
        for (let xi = -12; xi <= 12; xi += 1) {
            const xx = xi * 160;
            tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-1150" />`;
        };
        return tmpstr;
    })()}
</g>`;



// Frame decorations
SVG_CONTENTS_OUTER += `<g id="border_deco_border_top">
    ${(function () {
        let tmpstr = '';
        for (let xi = -7; xi <= 7; xi += 1) {
            const xx = xi * 160;
            if (Math.abs(xx) >= 220) {
                tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-1950" />`;
            };
        };
        return tmpstr;
    })()}
</g>`;
SVG_CONTENTS_OUTER += `<g id="border_deco_border_bottom" transform="rotate(180)">
    ${(function () {
        let tmpstr = '';
        for (let xi = -7; xi <= 7; xi += 1) {
            const xx = xi * 160;
            tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-1950" />`;
        };
        return tmpstr;
    })()}
</g>`;

SVG_CONTENTS_OUTER += `<use href="#border_deco_longborder" transform="rotate(90)" />`
SVG_CONTENTS_OUTER += `<use href="#border_deco_longborder" transform="rotate(270)" />`
SVG_CONTENTS_OVERLAY += (function () { // Corners
    const DELTA = 54;
    const ABSX = 1200 + DELTA;
    const ABSY = 2000 + DELTA;
    let tmpstr = '';
    [
        { x: ABSX, y: ABSY },
        { x: ABSX, y: -ABSY },
        { x: -ABSX, y: ABSY },
        { x: -ABSX, y: -ABSY }
    ].forEach(function (obj) {
        tmpstr += `<use href="#border_deco_c1" x="${obj.x}" y="${obj.y}" />`;
    });
    return tmpstr;
})();





const OUTPUT_SVG = `<svg viewBox="-2500 -2500 5000 5000" height="100vh" xmlns="http://www.w3.org/2000/svg">

<defs>
    ${SVG_DEFS}
    <rect id="contentsizebox" x="-1180" y="-1980" width="2360" height="3960" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
    <g id="majortext">
        <text text-anchor="middle" x="0" y="-410" font-size="350" font-family="Playfair Display" font-weight="bold">DECADE</text>
        <text text-anchor="middle" x="0" y="-30" font-size="400" font-family="Playfair Display" font-weight="bold">PASS</text>
        <text text-anchor="middle" x="0" y="280" font-size="300" font-family="New Heterodox Mono" font-weight="bold">2025·2035</text>
    </g>
</defs>


${SVG_CONTENTS_OUTER}
<rect x="-1200" y="-2000" width="2400" height="4000" stroke="${COLOR1}" stroke-width="5" fill="white" opacity="1" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>

<use href="#contentsizebox" stroke="${COLOR1}" stroke-width="4" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}

<g transform="translate(-410, -2320)">
    ${EMBEDED_LOGO}
</g>



</svg>`;



console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p01.js

