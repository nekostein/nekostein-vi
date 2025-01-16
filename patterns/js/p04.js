// This pattern is specifically designed to adapt to 1/8 of A4 (74.25*105) with a 5mm nominal padding
// The size is equivalent to A4 (210*297) with a 14.14mm nominal padding

const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const COLOR1 = `#7C93C3`;
const COLOR2 = '#55679C';
// const COLOR_RING = '#EEF5FF';
const COLOR_RING = '#FFFFFF';


// Some specific config variables


// Some functions
const deg2rad = function (deg) {
    return deg / 360 * (Math.PI * 2);
};

const reduce_precision = function (value) {
    return Math.round(value * 100) / 100;
}



let SVG_DEFS = '';
let SVG_CONTENTS_OVERLAY = '';
let SVG_CONTENTS_INNER = '';
let SVG_CONTENTS_OUTER = '';



















SVG_CONTENTS_OUTER += (function () { // Center star
    let tmpstr1 = '';
    let tmpstr2 = '';
    const HALFMAX = 2;
    for (let itr = -HALFMAX; itr <= HALFMAX; itr += 1) {
        const mypolarfunc = function (theta_rad) {
            const ROTATE_rad = (ROTATE / 360) * (2 * Math.PI);
            const linear_fix = Math.cos(ROTATE_rad * 8);
            const raw_length = 155 - Math.cos(theta_rad * 8) * (32 + linear_fix * 6) + linear_fix * -6;
            return raw_length;
        };
        const ROTATE = itr * 5.5;
        const _transform_str = `translate(701,266) scale(4) rotate(${ROTATE})`
        tmpstr2 += svgplotlib.drawpolarcircle({
            attrs: {
                'fill': 'none',
                'stroke': COLOR_RING,
                'stroke-width': '5',
                'transform': _transform_str
            }, func: mypolarfunc
        });
    };
    return tmpstr1 + tmpstr2;
})();




// Some waves
SVG_CONTENTS_OVERLAY += [
    1, -1
].map(function (xypos) {
    const WAVE_WIDTH = 2 * 3 * 92;
    let tmpstr = '';
    for (let rowid = -2; rowid < 2; rowid ++) {
        let line_points = `M ${xypos * 1100},${xypos * 850 + 20} m -${WAVE_WIDTH / 2},${rowid * 40} l `
        let cursorY_cached = 0;
        for (let cursorX = 0; cursorX < WAVE_WIDTH/3; cursorX ++) {
            let cursorY = Math.sin(-15 * cursorX / (WAVE_WIDTH / 3)) * 13;
            let newY = Math.round(cursorY * 100) / 100;
            line_points += `3,${newY - cursorY_cached} `;
            cursorY_cached = newY;
        }
        tmpstr += `<path d="${line_points}" fill="none" stroke="#001533" stroke-width="11" />\n`
    }
    return tmpstr;
}).join('\n');







const MAGIC_GLOBAL_PADDING = 270;


const OUTPUT_SVG = `<svg viewBox="-1485 -1050 2970 2100" data-height="100vh" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}
    <rect id="contentsizebox"
        x="-${(2970 - MAGIC_GLOBAL_PADDING) / 2}" y="-${(2100 - MAGIC_GLOBAL_PADDING) / 2}"
        width="${(2970 - MAGIC_GLOBAL_PADDING)}" height="${(2100 - MAGIC_GLOBAL_PADDING)}"
        rx="0" ry="0" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
</defs>

<rect x="-1485" y="-1050" width="2970" height="2100" fill="#EEEEEE" opacity="0" />

${SVG_CONTENTS_OUTER}

<!-- Borders -->
<use href="#contentsizebox" stroke="${COLOR2}" stroke-width="13" fill="none" opacity="1" />
<rect x="-${(2970 - MAGIC_GLOBAL_PADDING - 67) / 2}" y="-${(2100 - MAGIC_GLOBAL_PADDING - 67) / 2}"
    width="${(2970 - MAGIC_GLOBAL_PADDING - 67)}" height="${(2100 - MAGIC_GLOBAL_PADDING - 67)}"
    rx="0" ry="0" stroke="${COLOR1}" stroke-width="5" fill="none" opacity="1" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>


${SVG_CONTENTS_OVERLAY}





</svg>`;


console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p04.js png




// Some stuff potentially useful:
// https://www.npmjs.com/package/svg-round-corners

