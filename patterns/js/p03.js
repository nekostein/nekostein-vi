const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const svg_round_corners = require('svg-round-corners');

const COLOR1 = `#AF8260`;
const COLOR2 = '#803D3B';
const COLOR3 = '#EADBC8';


// Some specific config variables
const CORNER_DECORATION_BORDER_CIRCLE_SKIP = 230;
const USABLE_CONTENT_SIZE_W = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 11 + 0;
const USABLE_CONTENT_SIZE_H = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 17 + 0;
// console.error(`USABLE_CONTENT_SIZE_W `, USABLE_CONTENT_SIZE_W);
// console.error(`USABLE_CONTENT_SIZE_H `, USABLE_CONTENT_SIZE_H);


// Some functions
const deg2rad = function (deg) {
    return deg / 360 * (Math.PI * 2);
};



let SVG_DEFS = '';
let SVG_CONTENTS_OVERLAY = '';
let SVG_CONTENTS_INNER = '';
let SVG_CONTENTS_OUTER = '';



SVG_DEFS += `<mask id="mask-border1H">
    ${(function () {
        let tmpstr = ''
        const W = USABLE_CONTENT_SIZE_W;
        const H = USABLE_CONTENT_SIZE_H;
        const yy = (H - W) / 2;
        tmpstr += `<path transform="scale(1,1)" fill="white" d="M 0,${yy} l ${W},${W}  -${2 * W},0 Z" />`;
        tmpstr += `<path transform="scale(1,-1)" fill="white" d="M 0,${yy} l ${W},${W}  -${2 * W},0 Z" />`;
        return tmpstr;
    })()}
</mask>`;
SVG_DEFS += `<mask id="mask-border1V">
    ${(function () {
        let tmpstr = ''
        const W = USABLE_CONTENT_SIZE_W;
        const H = USABLE_CONTENT_SIZE_H;
        const yy = (H - W) / 2;
        tmpstr += `<path transform="scale(1,1)" fill="white" d="M 0,${yy} l ${W},${W} 0,-${2 * W + 2 * yy} L 0,-${yy} Z" />`;
        tmpstr += `<path transform="scale(-1,1)" fill="white" d="M 0,${yy} l ${W},${W} 0,-${2 * W + 2 * yy} L 0,-${yy} Z" />`;
        return tmpstr;
    })()}
</mask>`;






// Border decoration component: c1
SVG_DEFS += `<mask id="maskfor-border_deco_c1">
    <rect x="-${0.5 * CORNER_DECORATION_BORDER_CIRCLE_SKIP}" y="-500"
        width="${CORNER_DECORATION_BORDER_CIRCLE_SKIP}" height="1000" fill="white" />
</mask>`;
const border_deco_c1 = `<g id="border_deco_c1" mask="url(#maskfor-border_deco_c1)"><g transform="translate(0,-15)">` + (function () {
    let tmpstr = '';
    let tmpstr_over = '';
    // Outer Waves
    for (let itr = 0; itr < 13; itr += 1) {
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: COLOR1, 'stroke-width': 4 },
            func: function (theta_rad) {
                const shrink = 9;
                return 250 - Math.cos(9 * theta_rad) * 22 - itr * shrink;
            }
        });
    };
    // Inner ribbons
    for (let itr = 0; itr < 9; itr += 1) {
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: { fill: 'white', stroke: COLOR2, 'stroke-width': 4 },
            func: function (theta_rad) {
                const shrink = 9;
                return 170 + Math.cos(12 * theta_rad) * 8 - itr * shrink;
            }
        });
    };
    // Middle star
    for (let itr = 0; itr < 36; itr += 1) {
        tmpstr += `<ellipse transform="rotate(${itr * (360 / 36)})" cx="0" cy="60" rx="24" ry="60" fill="white" />`;
        tmpstr_over += `<ellipse transform="rotate(${itr * (360 / 36)})" cx="0" cy="60" rx="24" ry="60" stroke="${COLOR1}" stroke-width="4" fill="none" />`;
    };
    // Extra Outer Rim
    for (let itr = 0; itr < 6; itr += 1) {
        tmpstr_over += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: COLOR2, 'stroke-width': 4 },
            func: function (theta_rad) {
                const shrink = 10;
                return 259 + Math.cos(7 * theta_rad) * 17 - itr * shrink;
            }
        });
    };
    return tmpstr + tmpstr_over;
})() + '</g></g>';
SVG_DEFS += border_deco_c1;



const border_row_std = `<g>
    ${(function () {
        let tmpstr = '';
        const uniPosY = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 3.5;
        for (let xi = -10.5; xi <= 10.5; xi += 1) {
            const xx = xi * CORNER_DECORATION_BORDER_CIRCLE_SKIP;
            tmpstr += `<use href="#border_deco_c1" x="${xx}" y="0" />`;
        };
        return tmpstr;
    })()}
</g>`;

// Borders: horizontal
SVG_CONTENTS_OUTER += `<g mask="url(#mask-border1H)"><g transform="rotate(0) translate(0,${USABLE_CONTENT_SIZE_H / 2})">${border_row_std}</g></g>`;
SVG_CONTENTS_OUTER += `<g mask="url(#mask-border1H)"><g transform="rotate(180) translate(0,${USABLE_CONTENT_SIZE_H / 2})">${border_row_std}</g></g>`;
// Borders: vertical
SVG_CONTENTS_OUTER += `<g mask="url(#mask-border1V)"><g transform="rotate(90) translate(0,${USABLE_CONTENT_SIZE_W / 2})">${border_row_std}</g></g>`;
SVG_CONTENTS_OUTER += `<g mask="url(#mask-border1V)"><g transform="rotate(270) translate(0,${USABLE_CONTENT_SIZE_W / 2})">${border_row_std}</g></g>`;



// Main texture spiral graph
const spiral_c1 = (function () {
    let tmpstr = '';
    const PERIOD = 11;
    const SKIP = 25;
    for (let itr = 0; itr < PERIOD; itr += 1) {
        let X = itr * SKIP + 0;
        const initY = 3;
        let rawpath = `M ${X},0 `;
        for (let step = 0; step < 2500; step += 2) {
            const realX = step + itr * SKIP;
            const apt = Math.pow((realX) * 0.055, 1.07);
            // const apt = 100;
            const Y = Math.sin((realX+X) / (PERIOD * SKIP) * 2 * Math.PI) * apt;
            rawpath += `L ${realX},${Y} `;
        }
        tmpstr += `\n<path class="spiral-item-path" fill="none" opacity="${0.95 - itr * 0.0775}" stroke="${COLOR3}" stroke-width="5" d="${rawpath}" />\n`;
    };
    return tmpstr;
})();

SVG_DEFS += `<g id="spiral_c1">${spiral_c1}</g>`

for (let itr = 0; itr < 40; itr++) {
    let extra = '';
    if (itr % 2 === 0) {
        extra = 'scale(-1,1)';
    };
    SVG_CONTENTS_INNER += `<use href="#spiral_c1" transform="rotate(${(itr+0.5) * (360 / 40)}) ${extra}" />`
};







// Center flower
for (let itr = 12; itr > 0; itr--) {
    SVG_CONTENTS_INNER += svgplotlib.drawpolarcircle({
        attrs: { fill: 'white', stroke: COLOR3, 'stroke-width': 4 },
        func: function (theta_rad) {
            const theta_rad_alt = theta_rad;
            return itr * 13 + 305 * (1.15 + 0.07 * Math.cos(8 * theta_rad)) * (1.2 - 0.15 * Math.cos(2 * theta_rad));
        }
    });
}
SVG_CONTENTS_INNER += (function () {
    let tmpstr_low = '';
    let tmpstr_high = '';
    for (let itr = -7; itr <= 7; itr++) {
        const degskip = 3;
        tmpstr_low += svgplotlib.drawpolarcircle({
            attrs: { fill: 'white', stroke: 'white', 'stroke-width': 4 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * degskip);
                return (205 + Math.cos(8 * theta_rad_alt) * 99) * (1.15 + 0.07 * Math.cos(8 * theta_rad)) * (1.2 - 0.15 * Math.cos(2 * theta_rad));
            }
        });
        tmpstr_high += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: COLOR3, 'stroke-width': 4 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * degskip);
                return (205 + Math.cos(8 * theta_rad_alt) * 99) * (1.15 + 0.07 * Math.cos(8 * theta_rad)) * (1.2 - 0.15 * Math.cos(2 * theta_rad));
            }
        });
    };
    return tmpstr_low + tmpstr_high;
})();













const OUTPUT_SVG = `<svg viewBox="-2500 -2500 5000 5000" data-height="100vh" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}
    <rect id="contentsizebox"
        x="-${(USABLE_CONTENT_SIZE_W + 12) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 12) / 2}"
        width="${USABLE_CONTENT_SIZE_W + 12}" height="${USABLE_CONTENT_SIZE_H + 12}" rx="0" ry="0" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
</defs>


${SVG_CONTENTS_OUTER}
<rect x="-${(USABLE_CONTENT_SIZE_W + 55) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 55) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 55)}" height="${(USABLE_CONTENT_SIZE_H + 55)}"
    rx="0" ry="0" stroke="${COLOR2}" stroke-width="7" fill="white" opacity="1" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>

<use href="#contentsizebox" stroke="${COLOR1}" stroke-width="5" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}





</svg>`;


console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p03.js png




// Some stuff potentially useful:
// https://www.npmjs.com/package/svg-round-corners

