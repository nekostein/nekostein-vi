(async function () {


    const COLOR1 = 'rgba(0, 45, 151, 1)';
    const COLOR2 = 'gray';

    const fs = require('fs');
    const svgplotlib = require('../patterns/svgplotlib.js');




    const PROG = parseInt(process.env.PROG || 10000);
    const PREF = process.env.PREF || 'Base';

    // Some specific config variables
    const CORNER_DECORATION_BORDER_CIRCLE_SKIP = 300;
    const USABLE_CONTENT_SIZE_W = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 12 + 0;
    const USABLE_CONTENT_SIZE_H = CORNER_DECORATION_BORDER_CIRCLE_SKIP * 18 + 0;


    // Some functions
    const deg2rad = function (deg) {
        return deg / 360 * (Math.PI * 2);
    };
    const get_vec2_length = function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };
    const reduce_precision_f = function (value_f) {
        return (Math.round(value_f * 100) / 100);
    }



















    let SVG_DEFS = '';
    let SVG_CONTENTS_OUTER = '';
    let SVG_CONTENTS_INNER = '';
    let SVG_CONTENTS_OVERLAY = '';

    const drawbeam = function (xx, yy) {
        let xxx = xx * 350;
        let yyy = yy * 350;
        const z_index = Math.round(Math.sqrt(Math.pow(xxx, 2) + Math.pow(yyy, 2)) / 10) + 10;
        const shrink_factor = Math.cos(z_index / 155);
        xxx = reduce_precision_f(xxx * shrink_factor);
        yyy = reduce_precision_f(yyy * shrink_factor);
        const shift_x = reduce_precision_f(Math.pow(1 + 115 * Math.cos(z_index / 135), 1.12));
        let str_low = '';
        let str_high = svgplotlib.drawstar({
            vert: 4,
            long: shift_x,
            short: shift_x,
            attrs: {
                'fill': 'white',
                'stroke': 'black',
                'stroke-width': '20',
                'transform': `translate(${xxx},${yyy}) rotate(45)`,
            }
        })
        return { str_low, str_high, z_index: z_index };
    };


    let field_arr = [];
    for (let xx = -3; xx <= 3; xx += 1) {
        for (let yy = -3; yy <= 3; yy += 1) {
            if (Math.abs(xx) + Math.abs(yy) < 6) {
                field_arr.push(drawbeam(xx, yy));
            }
        }
    }
    field_arr.sort((a, b) => - a.z_index + b.z_index);
    let major_content_1 = '';
    major_content_1 += field_arr.map(x => x.str_low).join('\n');
    major_content_1 += field_arr.map(x => x.str_high).join('\n');
    SVG_CONTENTS_OUTER += `<g>${major_content_1}</g>`







    // Wide canvas
    const OUTPUT_SVG = `<svg viewBox="-2000 -2000 4000 4000" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Neruthes. All rights reserved.</desc>

<defs>
    <mask id="contentsizebox-mask">
        <rect x="-${(USABLE_CONTENT_SIZE_W + 111.00) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 111.00) / 2}"
            width="${(USABLE_CONTENT_SIZE_W + 111.00)}" height="${(USABLE_CONTENT_SIZE_H + 111.00)}"
            rx="0" ry="0" stroke-width="0" fill="white" opacity="1" />
    </mask>
    <filter id="filter_blur" width="400" height="400">
        <feOffset in="SourceGraphic" dx="0" dy="0" />
        <feGaussianBlur stdDeviation="50" />
        <feBlend in="SourceGraphic" in2="blurOut" />
    </filter>
    ${SVG_DEFS}
</defs>


<!--
canvas size debug
<rect fill="gray" x="-2001" y="-2001" width="4002" height="4002" />
-->
<rect fill="black" x="-2001" y="-2001" width="4002" height="4002" />


${SVG_CONTENTS_OUTER}
<rect x="-${(USABLE_CONTENT_SIZE_W + 111.00) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 111.00) / 2}"
    width="${(USABLE_CONTENT_SIZE_W + 111.00)}" height="${(USABLE_CONTENT_SIZE_H + 111.00)}"
    rx="0" ry="0" stroke="none" stroke-width="17" fill="white" opacity="0" />

<g mask="url(#contentsizebox-mask)">
    ${SVG_CONTENTS_INNER}
</g>

<use href="#contentsizebox" stroke="${COLOR1}" stroke-width="35" fill="none" opacity="1" />

${SVG_CONTENTS_OVERLAY}


<!-- Symbol knot1_real debug
<use href="#knot1_real" />
-->

<!--
gradient debug
<rect opacity="1" x="0" y="0" width="2000" height="2000" fill="url(#bordergradient-radial)" />
-->




</svg>`;



    fs.writeFileSync(`nekstfair/bg1a.svg`, OUTPUT_SVG);


})();


// node nekstfair/bg1a.js 
