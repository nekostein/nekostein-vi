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

    let arr1 = [];
    for (let x = -7; x <= 7; x++) {
        for (let y = -7; y <= 7; y += 0.5) {
            (function () {
                let points_arr_1 = [];
                const offset_x = 350;
                const offset_y = 600;
                let xx = x;
                if (Math.round(y) !== y) {
                    xx += 0.5;
                }
                // let vertical_penalty = (4 - y) / 7; // Old
                let vertical_penalty = Math.pow(get_vec2_length(xx, y) / 6.5, 0.85);
                points_arr_1.push(`${xx * offset_x},${y * offset_y}`);
                points_arr_1.push(`${(xx + 0.5) * offset_x},${(y + 0.5) * offset_y}`);
                points_arr_1.push(`${(xx - 0.5) * offset_x},${(y + 0.5) * offset_y}`);
                let points_arr_2 = [];
                points_arr_2.push(`${xx * offset_x},${y * offset_y}`);
                points_arr_2.push(`${(xx + 0.5) * offset_x},${(y - 0.5) * offset_y}`);
                points_arr_2.push(`${(xx - 0.5) * offset_x},${(y - 0.5) * offset_y}`);
                let points_str_1 = points_arr_1.join(' ');
                let points_str_2 = points_arr_2.join(' ');
                let rand1 = Math.sin(35 * xx - 42 * y + 3.0);
                let rand2 = Math.sin(14 * xx + 126 * y + 2.0);
                let intensity1 = Math.max(4, Math.floor(vertical_penalty * Math.pow(2 + 2 * rand1, 2.5) * 3.3) - 5);
                let intensity2 = Math.max(4, Math.floor(vertical_penalty * Math.pow(2 + 2 * rand2, 2.5) * 3.3) - 5);
                let stroke_width1 = Math.ceil(intensity1 / 18 + 4);
                let stroke_width2 = Math.ceil(intensity2 / 18 + 4);
                const target_color_full = [35, 120, 255];
                const mix_color = function (from_color, to_color, ratio) {
                    let arr = [0, 0, 0];
                    from_color.map(function (value, index) {
                        arr[index] = Math.min(255, Math.floor((to_color[index] - value) * ratio + value));
                    })
                    return `rgb(${arr.join(',')})`;
                };
                let fill_color1 = mix_color([0, 0, 0], target_color_full, intensity1 / 255);
                let fill_color2 = mix_color([0, 0, 0], target_color_full, intensity2 / 255);
                let stroke_color1 = mix_color([11, 11, 11], target_color_full, intensity1 / 150);
                let stroke_color2 = mix_color([11, 11, 11], target_color_full, intensity2 / 150);
                let tmpstr1 = `<polygon stroke-width="${stroke_width1}" fill="${fill_color1}" stroke="${stroke_color1}" points="${points_str_1}" />\n`;
                let tmpstr2 = `<polygon stroke-width="${stroke_width2}" fill="${fill_color2}" stroke="${stroke_color2}" points="${points_str_2}" />\n`;
                // return { arr: [tmpstr1, tmpstr2], z_index };
                arr1.push({ tag_string: tmpstr1, z_index: intensity1 });
                arr1.push({ tag_string: tmpstr2, z_index: intensity2 });
            })();
        }
    }
    // let arr2 = arr1.map(x => x.arr)
    arr1.sort((a, b) => a.z_index - b.z_index)
    SVG_CONTENTS_OUTER += arr1.map(x => x.tag_string).join('\n');






    // Wide canvas
    const OUTPUT_SVG = `<svg viewBox="-2000 -2000 4000 4000" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Neruthes. All rights reserved.</desc>

<defs>
    <mask id="contentsizebox-mask">
        <rect x="-${(USABLE_CONTENT_SIZE_W + 111.00) / 2}" y="-${(USABLE_CONTENT_SIZE_H + 111.00) / 2}"
            width="${(USABLE_CONTENT_SIZE_W + 111.00)}" height="${(USABLE_CONTENT_SIZE_H + 111.00)}"
            rx="0" ry="0" stroke-width="0" fill="white" opacity="1" />
    </mask>
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

<!--
Main text label
<text fill="#FFFFFF" class="title1" x="0" y="-520" text-anchor="middle" font-family="Paytone One" font-weight="700" font-size="142">NekstFair</text>
-->









</svg>`;



    fs.writeFileSync(`nekstfair/bg1b.svg`, OUTPUT_SVG);


})();


// node nekstfair/bg1b.js ; rsvg-convert nekstfair/bg1b.svg -o _dist/wwwmisc/nekstfair/bg1b.png
