const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const COLOR_DECO = '#C8D5B1';
const COLOR1 = `#E8ECD4`;
const COLOR2 = `#E8ECD4`;


// Some specific config variables
const CORNER_DECORATION_BORDER_CIRCLE_SKIP = 400;
const USABLE_CONTENT_SIZE_W = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 6 + 0;
const USABLE_CONTENT_SIZE_H = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 10 + 0;
console.error(`USABLE_CONTENT_SIZE_W `, USABLE_CONTENT_SIZE_W);
console.error(`USABLE_CONTENT_SIZE_H `, USABLE_CONTENT_SIZE_H);


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
        tmpstr += `<path fill="red" d="M 0,${yy} l ${W},${W}  -${2 * W},0 Z" />`;
        tmpstr += `<path fill="red" d="M 0,-${yy} l ${W},-${W}  -${2 * W},0 Z" />`;
        return tmpstr;
    })()}
</mask>`;
SVG_CONTENTS_OUTER += (function () {
    let tmpstr = ''
    const W = USABLE_CONTENT_SIZE_W;
    const H = USABLE_CONTENT_SIZE_H;
    const yy = (H - W) / 2;
    tmpstr += `<path fill="red" d="M 0,${yy} l ${W},${W}  -${2 * W},0 Z" />`;
    tmpstr += `<path fill="red" d="M 0,-${yy} l ${W},-${W}  -${2 * W},0 Z" />`;
    return tmpstr;
    return '';
})();





// Border decoration component: c1
SVG_DEFS += `<mask id="maskfor-border_deco_c1">
    <rect x="-${0.5 * CORNER_DECORATION_BORDER_CIRCLE_SKIP}" y="-500"
        width="${CORNER_DECORATION_BORDER_CIRCLE_SKIP}" height="1000" fill="white" />
</mask>`;
const border_deco_c1 = `<g id="border_deco_c1" mask="url(#maskfor-border_deco_c1)">` + (function () {
    let tmpstr = '';
    tmpstr += `<circle x="0" y="0" r="350" fill="${COLOR_DECO}" />`;
    // Waves
    for (let itr = 0; itr < 44; itr += 1) {
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: ['white', COLOR_DECO][itr % 2], 'stroke-width': 6 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * 1.75);
                const shrink = 5.5;
                return 310 + Math.cos(12 * theta_rad_alt) * 9 - itr * shrink;
            }
        });
    };
    // A ring of dots
    let itrmax = 60;
    for (let itr = 0; itr < itrmax; itr += 1) {
        const distance = 329 + Math.cos(12 * deg2rad(itr / itrmax * 360)) * 1;
        tmpstr += `<circle x="0" y="0" r="4.5" fill="white" transform="rotate(${itr * (360 / itrmax)}) translate(0,${distance})" />`;
    };
    // Middle canvas
    tmpstr += svgplotlib.drawpolarcircle({
        attrs: { fill: 'white', stroke: COLOR_DECO, 'stroke-width': 4, 'stroke-linejoin': 'miter' },
        func: function (theta_rad) {
            return 45 + Math.cos(8 * theta_rad) * -3;
        }
    });
    // Middle star
    tmpstr += svgplotlib.drawpolarcircle({
        attrs: { fill: 'white', stroke: COLOR_DECO, 'stroke-width': 4, 'stroke-linejoin': 'miter' },
        func: function (theta_rad) {
            return 20 + Math.cos(8 * theta_rad) * 5;
        }
    });
    return tmpstr;
})() + '</g>';
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
SVG_CONTENTS_OVERLAY += `<g transform="rotate(0) translate(0,${USABLE_CONTENT_SIZE_H/2})">${border_row_std}</g>`;
SVG_CONTENTS_OVERLAY += `<g transform="rotate(180) translate(0,${USABLE_CONTENT_SIZE_H/2})">${border_row_std}</g>`;
// mask = "url(#mask-border1H)"







const OUTPUT_SVG = `<svg viewBox="-2500 -2500 5000 5000" height="100vh" xmlns="http://www.w3.org/2000/svg">

<defs>
    ${SVG_DEFS}
    <rect id="contentsizebox"
        x="-${USABLE_CONTENT_SIZE_W / 2}" y="-${USABLE_CONTENT_SIZE_H / 2}"
        width="${USABLE_CONTENT_SIZE_W}" height="${USABLE_CONTENT_SIZE_H}" rx="0" ry="0" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
</defs>


<rect x="-${(USABLE_CONTENT_SIZE_W + 84) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 84) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 84)}" height="${(USABLE_CONTENT_SIZE_H + 84)}"
    rx="0" ry="0" stroke="${COLOR_DECO}" stroke-width="62" fill="white" opacity="1" />
<rect x="-${(USABLE_CONTENT_SIZE_W + 111) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 111) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 111)}" height="${(USABLE_CONTENT_SIZE_H + 111)}"
    rx="0" ry="0" stroke="white" stroke-width="7" fill="none" opacity="1" />
${SVG_CONTENTS_OUTER}
<rect x="-${(USABLE_CONTENT_SIZE_W + 22) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 22) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 22)}" height="${(USABLE_CONTENT_SIZE_H + 22)}"
    rx="0" ry="0" stroke="${COLOR_DECO}" stroke-width="5" fill="white" opacity="0" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>

<use href="#contentsizebox" stroke="${COLOR_DECO}" stroke-width="5" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}





</svg>`;


console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p03.js png

