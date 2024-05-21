const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const COLOR_DECO = '#BEC5E0';
const COLOR1 = `#C4C7D3`;
const COLOR2 = `#EEEEEE`;


// Some specific config variables
const CORNER_DECORATION_OFFSET_DELTA = -35;





let SVG_DEFS = '';
let SVG_CONTENTS_OVERLAY = '';
let SVG_CONTENTS_INNER = '';
let SVG_CONTENTS_OUTER = '';


let EMBEDED_LOGO = fs.readFileSync('res/geologo-outline.svg').toString();





// Wrapping outline
SVG_CONTENTS_OUTER += (function () {
    const DELTA = 205;
    const X_HALF = 1200 + DELTA;
    const Y_HALF = 2000 + DELTA;
    const make_circle = function (vec2, attrs) {
        const x = vec2[0] * (1200 + CORNER_DECORATION_OFFSET_DELTA);
        const y = vec2[1] * (2000 + CORNER_DECORATION_OFFSET_DELTA);
        let default_attrs = {
            transform: `translate(${x}, ${y})`
        }
        return svgplotlib.drawpolarcircle({
            attrs: Object.assign({}, default_attrs, attrs),
            func: function (theta_rad) {
                return 266 + Math.cos(8 * theta_rad) * 10;
            }
        });
    };
    // Composition...
    let tmpstr_mid = `<rect x="-${X_HALF}" y="-${Y_HALF}" width="${X_HALF * 2}" height="${Y_HALF * 2}"
    stroke="${COLOR_DECO}" rx="150" ry="150" stroke-width="7" fill="white" opacity="1" />`; // Grand outer border rectangle
    const POSARR = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];
    let tmpstr_low = POSARR.map(vec2 => make_circle(vec2, { 'stroke': COLOR_DECO, 'stroke-width': 15 })).join('');
    let tmpstr_high = POSARR.map(vec2 => make_circle(vec2, { 'fill': 'white' })).join('');
    return tmpstr_low + tmpstr_mid + tmpstr_high;
})();




// Basic texture background
SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const HALFMAX = 22;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr++) {
        const ROTATE = 0.6 * itr;
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
    const HALFMAX = 13;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr++) {
        const ROTATE = 1.05 * itr;
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
    const HALFMAX = 11;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr++) {
        const ROTATE = 1.2 * itr;
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
SVG_CONTENTS_INNER += (function () { // Center star
    let tmpstr = '';
    const HALFMAX = 6;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr += 1) {
        const ROTATE = itr * 2;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none',
                'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
                const linear_fix = Math.cos(ROTATE_rad * 12);
                const raw_length = 77 - Math.cos(theta_rad * 12) * (16 + linear_fix * 5) + linear_fix * 5;
                return raw_length;
            }
        });
    };
    return tmpstr;
})();
SVG_CONTENTS_INNER += (function () { // Center flat ring
    let tmpstr = '';
    const HALFMAX = 3;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr += 1) {
        const ROTATE = itr * 4;
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none',
                'stroke': COLOR2,
                'transform': `scale(3.5) rotate(${ROTATE})`
            }, func: function (theta_rad) {
                const raw_length = 44 + Math.cos(theta_rad * 12) * 12;
                return raw_length;
            }
        });
    };
    return tmpstr;
})();
// Embed a logo in the center
SVG_DEFS += `<mask id="mask-circle-71fedfb611b8"><circle x="0" y="0" r="105" fill="white" /></mask>`; // Use a mask
SVG_CONTENTS_INNER += `<g mask="url(#mask-circle-71fedfb611b8)">
    ${(function () {
        let tmpstr = '';
        const HALFMAX = 40;
        for (let index = -HALFMAX; index <= HALFMAX; index++) {
            tmpstr += `<path d="M -1000 ${index*9} l 2000 0" stroke="${COLOR2}" stroke-width="3" />`;
        }
        return tmpstr;
    })()}
    <g transform="scale(0.2) translate(-400,-300)">
        ${fs.readFileSync('res/geologo.svg').toString().replace(/#BEEF01/g, 'white').replace(/#DEAD02/g, 'none')}
    </g>
</g>`;




// Border decoration component
const border_deco_c1 = (function () {
    let grandtmpstr = '';
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

const DECO_C2_WIDTH = 170;
SVG_DEFS += `<mask id="border_deco_mask">
    <rect x="-${DECO_C2_WIDTH / 2}" y="-500" width="${DECO_C2_WIDTH}" height="501" fill="white" stroke="none" />
</mask>`;
// SVG_DEFS += `<g id="border_deco_c2" mask="url(#border_deco_mask)">${border_deco_c1}</g>`;
SVG_DEFS += `<g id="border_deco_c2" mask="url(#border_deco_mask)">
    <rect x="-100" y="-200" width="200" height="11" fill="none" />
    <use href="#border_deco_c1" x="0" y="0" transform="translate(0,60) rotate(22.5)" />
</g>`;
SVG_DEFS += `<g id="border_deco_longborder">
    ${(function () {
        let tmpstr = '';
        for (let xi = -11; xi <= 11; xi += 1) {
            const xx = xi * DECO_C2_WIDTH;
            tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-1200" />`;
        };
        return tmpstr;
    })()}
</g>`;



// Frame decorations
const C2_SHORT_REPEATS = 6;
SVG_CONTENTS_OUTER += `<g id="border_deco_border_top">
    ${(function () {
        let tmpstr = '';
        for (let xi = -C2_SHORT_REPEATS; xi <= C2_SHORT_REPEATS; xi += 1) {
            const xx = xi * DECO_C2_WIDTH;
            if (Math.abs(xx) >= 0) {
                tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-2000" />`;
            };
        };
        return tmpstr;
    })()}
</g>`;
SVG_CONTENTS_OUTER += `<g id="border_deco_border_bottom" transform="rotate(180)">
    ${(function () {
        let tmpstr = '';
        for (let xi = -C2_SHORT_REPEATS; xi <= C2_SHORT_REPEATS; xi += 1) {
            const xx = xi * DECO_C2_WIDTH;
            tmpstr += `<use href="#border_deco_c2" x="${xx}" y="-2000" />`;
        };
        return tmpstr;
    })()}
</g>`;

SVG_CONTENTS_OUTER += `<use href="#border_deco_longborder" transform="rotate(90)" />`
SVG_CONTENTS_OUTER += `<use href="#border_deco_longborder" transform="rotate(270)" />`
// SVG_CONTENTS_OVERLAY += (function () { // Corners
SVG_CONTENTS_OUTER += (function () { // Corners
    const ABSX = 1200 + CORNER_DECORATION_OFFSET_DELTA;
    const ABSY = 2000 + CORNER_DECORATION_OFFSET_DELTA;
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
    <rect id="contentsizebox" x="-1220" y="-2020" width="2440" height="4040" rx="15" ry="15" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
    <g id="majortext">
        <text text-anchor="middle" x="0" y="-410" font-size="350" font-family="Playfair Display" font-weight="bold">DECADE</text>
        <text text-anchor="middle" x="0" y="-30" font-size="400" font-family="Playfair Display" font-weight="bold">PASS</text>
        <text text-anchor="middle" x="0" y="280" font-size="300" font-family="New Heterodox Mono" font-weight="bold">2025·2035</text>
    </g>
</defs>


${SVG_CONTENTS_OUTER}
<rect x="-1250" y="-2050" width="2500" height="4100" rx="30" ry="30" stroke="${COLOR_DECO}" stroke-width="5" fill="white" opacity="1" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>

<use href="#contentsizebox" stroke="${COLOR1}" stroke-width="4" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}





</svg>`;
// <g transform="translate(-410, -2370)" >${EMBEDED_LOGO}</g>


console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p01.js

