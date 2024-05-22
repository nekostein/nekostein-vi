const fs = require('fs');
const svgplotlib = require('../svgplotlib.js');

const COLOR_DECO = '#C8D5B1';
// const COLOR_DECO = '#E8ECD4';
const COLOR1 = `#E8ECD4`;
const COLOR2 = `#E8ECD4`;


// Some specific config variables
const CORNER_DECORATION_BORDER_CIRCLE_SKIP = 400;
const USABLE_CONTENT_SIZE_W = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 6 + 40;
const USABLE_CONTENT_SIZE_H = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 10 + 40;
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






// Border decoration component: c1
const border_deco_c1 = `<g id="border_deco_c1">` + (function () {
    let tmpstr = '';
    tmpstr += `<circle x="0" y="0" r="139" fill="${COLOR_DECO}" />`;
    // Waves
    for (let itr = 0; itr < 22; itr += 1) {
        tmpstr += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: ['white', COLOR_DECO][itr % 2], 'stroke-width': 6 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * 1.75);
                const shrink = 5.5;
                return 114 + Math.cos(12 * theta_rad_alt) * 9 - itr * shrink;
            }
        });
    };
    // A ring of dots
    let itrmax = 60;
    for (let itr = 0; itr < itrmax; itr += 1) {
        const distance = 129 + Math.cos(12 * deg2rad(itr / itrmax * 360)) * 3;
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

// Border decoration component: c2
const border_deco_c2 = `<g x="0" y="0" id="border_deco_c2">` + (function () {
    let tmpstr = '';
    let circle_content = `<circle x="0" y="0" r="63" stroke="${COLOR_DECO}" stroke-width="6" fill="white" />`;
    circle_content += svgplotlib.drawpolarcircle({
        attrs: { fill: 'white', stroke: COLOR_DECO, 'stroke-width': 5 },
        func: function (theta_rad) {
            return 41 + Math.cos(8 * theta_rad) * 1;
        }
    });;
    circle_content += svgplotlib.drawpolarcircle({
        attrs: { fill: COLOR_DECO, stroke: 'none' },
        func: function (theta_rad) {
            return 33 + Math.cos(8 * theta_rad) * 1;
        }
    });;
    circle_content += `<circle x="0" y="0" r="19" stroke="none" fill="white" />`
    // Needles inside
    for (let itr = 0; itr < 24; itr++) { // Outer
        let rotate = itr / 24 * 360;
        circle_content += `<path d="M 0,39 L 0,61" stroke="${COLOR_DECO}" stroke-width="4" transform="rotate(${rotate})" />`;
    };
    for (let itr = 0; itr < 12; itr++) { // Inner
        let rotate = itr / 8 * 360;
        circle_content += `<path d="M 0,7 L 0,39" stroke="${COLOR_DECO}" stroke-width="4" transform="rotate(${rotate})" />`;
    };
    // Content
    tmpstr += `<g transform="translate(25,0)">` + circle_content + `</g>`;
    tmpstr += `<g transform="translate(-25,0)">` + circle_content + `</g>`;
    tmpstr += `<g transform="translate(0,55)">` + circle_content + `</g>`;
    tmpstr += `<g transform="translate(0,-55)">` + circle_content + `</g>`;
    // Ribbon
    let ribbon_path_data = '';
    for (let index = -132; index <= 132; index++) {
        ribbon_path_data += ` L ${index},${73 * Math.sin(deg2rad(index / 132 * 180))} `;
    };
    // Ribbon filled with vertical lines
    let ribbon_path_data_vertlines = '';
    for (let index = -132; index <= 132; index++) {
        if (index % 9 == 0) {
            const rad1 = deg2rad(index / 132 * 180);
            const valueY_raw = 73 * Math.sin(rad1);
            const shiftY = -3 * Math.sin(2 * rad1);
            const valueY_final = valueY_raw + shiftY;
            const semi_length = 33 + Math.abs(valueY_raw) * -0.27;
            ribbon_path_data_vertlines += ` M ${index},${valueY_final - semi_length} l 0,${2 * semi_length}`;
        };
    };
    // Reverse ribbon background
    tmpstr += `<path transform="scale(-1,1)" d="M -132,0 ${ribbon_path_data}" fill="none" stroke-linecap="bevel" stroke="${COLOR_DECO}" stroke-width="54" />`; // Fill
    tmpstr += `<path transform="scale(-1,1)" d="M -132,0 ${ribbon_path_data}" fill="none" stroke-linecap="bevel" stroke="white" stroke-width="44" />`; // White
    tmpstr += `<path transform="scale(-1,1)" d="${ribbon_path_data_vertlines}" fill="none" stroke-linecap="bevel" stroke="${COLOR_DECO}" stroke-width="4" />`; // Vertical lines
    // Real ribbon
    tmpstr += `<path d="M -132,0 ${ribbon_path_data}" fill="none" stroke-linecap="bevel" stroke="${COLOR_DECO}" stroke-width="54" />`; // Fill
    tmpstr += `<path d="M -132,0 ${ribbon_path_data}" fill="none" stroke-linecap="bevel" stroke="white" stroke-width="44" />`; // White
    // Prepare for text!
    tmpstr += `<path d="M -132,0 ${ribbon_path_data}" fill="none" stroke-linecap="bevel" stroke="${COLOR_DECO}" stroke-width="30" />`; // Under text
    tmpstr += `<path id="id_eb412d0d8870" d="M -132,0 ${ribbon_path_data}" fill="none" stroke="none" transform="translate(-11,0)" />`; // For referencing textPath
    tmpstr += `<text font-family="XCharter" font-weight="bold" font-size="27">
        <textPath fill="white" href="#id_eb412d0d8870" startOffset="32.2%"
        lengthAdjust="spacingAndGlyphs" spacing="auto" letter-spacing="1">NEKOSTEIN</textPath>
    </text>`;
    return tmpstr;
})() + '</g>';
SVG_DEFS += border_deco_c2;




// real_border_deco_lower
SVG_CONTENTS_OUTER += `<g id="real_border_deco_lower">
    ${(function () {
        let tmpstr = '';
        const uniPosX = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 3.5;
        const uniPosY = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 5.5;
        for (let xi = -3; xi <= 3; xi += 1) {
            const xx = xi * CORNER_DECORATION_BORDER_CIRCLE_SKIP;
            tmpstr += `<use href="#border_deco_c2" transform="translate(${xx},-${uniPosY}) rotate(0)" />`;
            tmpstr += `<use href="#border_deco_c2" transform="translate(${xx},${uniPosY}) rotate(180)" />`;
        };
        for (let yi = -5; yi <= 5; yi += 1) {
            const yy = yi * CORNER_DECORATION_BORDER_CIRCLE_SKIP;
            tmpstr += `<use href="#border_deco_c2" transform="translate(${uniPosX},${yy}) rotate(90)" />`;
            tmpstr += `<use href="#border_deco_c2" transform="translate(-${uniPosX},${yy}) rotate(270)" />`;
        };
        return tmpstr;
    })()}
</g>`;


// real_border_deco_upper
SVG_CONTENTS_OUTER += `<g id="real_border_deco_upper">
    ${(function () {
        let tmpstr = '';
        const uniPosX = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 3.5;
        const uniPosY = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 5.5;
        for (let xi = -3.5; xi <= 3.5; xi += 1) {
            const xx = xi * CORNER_DECORATION_BORDER_CIRCLE_SKIP;
            tmpstr += `<use href="#border_deco_c1" x="${xx}" y="-${uniPosY}" />`;
            tmpstr += `<use href="#border_deco_c1" x="${xx}" y="${uniPosY}" />`;
        };
        for (let yi = -4.5; yi <= 4.5; yi += 1) {
            const yy = yi * CORNER_DECORATION_BORDER_CIRCLE_SKIP;
            tmpstr += `<use href="#border_deco_c1" x="-${uniPosX}" y="${yy}" />`;
            tmpstr += `<use href="#border_deco_c1" x="${uniPosX}" y="${yy}" />`;
        };
        return tmpstr;
    })()}
</g>`;


// Border text
const tp_long = 'NEKO AND KUMA ARE FRIENDS FOREVER';
const tp_short = 'ALLES IST RICHTIG MIT DER WELT';
const border_small_text_style = ` fill="white"  font-family="XCharter" font-weight="bold" font-size="29" text-anchor="middle" `;
// Top and bottom
SVG_DEFS += `<text id="border_small_text_rowtop" x="0" y="0" ${border_small_text_style} letter-spacing="0.4">
${tp_long} · ${tp_long} · ${tp_long} · ${tp_long}
</text>`;
SVG_CONTENTS_OVERLAY += `<use href="#border_small_text_rowtop" transform="rotate(0) translate(0,-${19 + USABLE_CONTENT_SIZE_H / 2})" />
<use href="#border_small_text_rowtop" transform="rotate(180) translate(0,-${19 + USABLE_CONTENT_SIZE_H / 2})" />`;
// Left and right
SVG_DEFS += `<text id="border_small_text_rowside" x="0" y="0" ${border_small_text_style} letter-spacing="0.75">
${tp_long} · ${tp_short} · ${tp_long} · ${tp_short} · ${tp_long} · ${tp_short} · ${tp_long}
</text>`;
SVG_CONTENTS_OVERLAY += `<use href="#border_small_text_rowside" transform="rotate(90) translate(0,-${19 + USABLE_CONTENT_SIZE_W / 2})" />
<use href="#border_small_text_rowside" transform="rotate(270) translate(0,-${19 + USABLE_CONTENT_SIZE_W / 2})" />`;



SVG_DEFS += `<mask id="mask_boxrepeat">
    <rect x="-180" y="-100" width="360" height="200" fill="white" />
</mask>`;
SVG_DEFS += `<g mask="url(#mask_boxrepeat)" id="major_texture">` + (function () {
    let tmpstr = '';
    for (let itr = -11; itr <= 11; itr++) {
        let pathdata = '';
        for (let xx = -400; xx <= 400; xx++) {
            pathdata += ` L${xx},${97 * Math.cos(deg2rad(xx))} `;
        };
        tmpstr += `<path transform="translate(${itr * 15.5},0)" stroke-width="3.5" stroke="${COLOR1}" fill="none" d="M -400,0 ${pathdata}" />`;
    };
    return tmpstr;
})() + `</g>`

for (let xx = -6; xx <= 6; xx++) {
    for (let yy = -10; yy <= 10; yy++) {
        // const polarity = (xx % 2 === 0) || (yy % 2 === 0) ? 1 : -1;
        const polarity = 1;
        SVG_CONTENTS_INNER += `<use transform="scale(1,${polarity}) translate(${xx * 360},${yy * 200})" href="#major_texture" />`
    };
};

SVG_CONTENTS_INNER += (function () {
    let tmpstr_low = '';
    let tmpstr_mid = '';
    let tmpstr_high = '';
    for (let itr = -5; itr <= 5; itr++) {
        const degskip = 2.3;
        tmpstr_low += svgplotlib.drawpolarcircle({
            attrs: { fill: 'white', stroke: 'white', 'stroke-width': 3.5 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * degskip);
                return (205 + Math.cos(8 * theta_rad_alt) * 61) * (1.15 + 0.07 * Math.cos(8 * theta_rad)) * (1.2 - 0.15 * Math.cos(2 * theta_rad));
            }
        });
        tmpstr_high += svgplotlib.drawpolarcircle({
            attrs: { fill: 'none', stroke: COLOR1, 'stroke-width': 4 },
            func: function (theta_rad) {
                const theta_rad_alt = theta_rad + deg2rad(itr * degskip);
                return (205 + Math.cos(8 * theta_rad_alt) * 61) * (1.15 + 0.07 * Math.cos(8 * theta_rad)) * (1.2 - 0.15 * Math.cos(2 * theta_rad));
            }
        });
    };
    return tmpstr_low + tmpstr_mid + tmpstr_high;
})();

SVG_CONTENTS_INNER += (function () {
    let tmpstr = '';
    const alt_c1 = border_deco_c1.replace(new RegExp(COLOR_DECO, 'g'), COLOR1).replace(/border_deco_c1/g, `rand-447cc88f30f6`);
    const alt_c2 = border_deco_c2.replace(new RegExp(COLOR_DECO, 'g'), COLOR1).replace(/border_deco_c2/g, `rand-838306ae7a1c`);
    // tmpstr += `<g transform="translate(${CORNER_DECORATION_BORDER_CIRCLE_SKIP/2},0)">${alt_c2}</g>`;
    // tmpstr += `<g transform="translate(-${CORNER_DECORATION_BORDER_CIRCLE_SKIP/2},0)">${alt_c2}</g>`;
    tmpstr += alt_c1;
    return tmpstr;
})();



// // And another option here...
// // Embed a logo in the center
// SVG_DEFS += `<mask id="mask-circle-71fedfb611b8"><circle x="0" y="0" r="160" fill="white" /></mask>`; // Use a mask
// SVG_CONTENTS_INNER += `<g mask="url(#mask-circle-71fedfb611b8)">
//     ${(function () {
//         let tmpstr = '';
//         const HALFMAX = 40;
//         for (let index = -HALFMAX; index <= HALFMAX; index++) {
//             tmpstr += `<path d="M -1000 ${index * 9} l 2000 0" stroke="${COLOR2}" stroke-width="3" />`;
//         }
//         return tmpstr;
//     })()}
//     <g transform="scale(0.3) translate(-400,-300)">
//         ${fs.readFileSync('res/geologo.svg').toString().replace(/#BEEF01/g, 'white').replace(/#DEAD02/g, 'none')}
//     </g>
// </g>`;






const OUTPUT_SVG = `<svg viewBox="-2500 -2500 5000 5000" xmlns="http://www.w3.org/2000/svg">

<defs>
    ${SVG_DEFS}
    <rect id="contentsizebox"
        x="-${USABLE_CONTENT_SIZE_W / 2}" y="-${USABLE_CONTENT_SIZE_H / 2}"
        width="${USABLE_CONTENT_SIZE_W}" height="${USABLE_CONTENT_SIZE_H}" rx="0" ry="0" />
    <mask id="contentsizebox-mask"><use href="#contentsizebox" fill="white" /></mask>
</defs>


<rect x="-${(USABLE_CONTENT_SIZE_W + 91) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 91) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 91)}" height="${(USABLE_CONTENT_SIZE_H + 91)}"
    rx="0" ry="0" stroke="${COLOR_DECO}" stroke-width="66" fill="white" opacity="1" />
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

<use href="#contentsizebox" stroke="${COLOR1}" stroke-width="5" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}





</svg>`;


console.log(OUTPUT_SVG);


// Build SVG:
// ./make.sh patterns/js/p02.js

