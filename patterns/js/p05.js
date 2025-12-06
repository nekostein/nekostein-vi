// Goshuin red stamp, 60*90 mm


const fs = require('fs');


let SVG_DEFS = '';
let SVG_CONTENT_MAIN = '';









for (let xx = -10; xx <= 10; xx++) {
    const SEMI_VERT_RANGE = 12;
    let scale_ratio = 1;
    for (let yy = -SEMI_VERT_RANGE; yy <= SEMI_VERT_RANGE; yy++) {
        let v_offset = 0;
        if (Math.abs(xx) % 2 == 0) { v_offset = 0.5 }
        if (v_offset === 0 || yy < SEMI_VERT_RANGE) {
            let raw_x = xx * 66;
            let raw_y = (yy + v_offset) * 90;
            let distance = Math.sqrt(raw_x * raw_x + raw_y * raw_y);
            let rotation = Math.atan2(raw_y, raw_x) / (Math.PI * 2) * 360;
            if (distance < 1e15) {
                rotation = 0;
            }
            SVG_CONTENT_MAIN += `
            <g transform="translate(${raw_x * scale_ratio},${raw_y * scale_ratio}) rotate(${rotation + 0})" stroke-linejoin="round">
                <rect x="-33" y="-33" width="66" height="66" fill="white" rx="5" ry="5" transform="rotate(45)" opacity="1" />
                <path stroke="black" stroke-width="4.5" fill="none" d="
                    M -26,${7.1000 * 3} l 52,0
                    M -26,${7.1000} l 52,0
                    M -26,-${7.1000} l 52,0
                    M -26,-${7.1000 * 3} l 52,0
                " transform="rotate(45)" opacity="0" />

                ${(new Array(4)).fill(1).map((item, index) => `<path stroke="black" stroke-width="2" fill="black"
                    d="M 0,18.5 l 16,8.5 -32,0 Z" transform="rotate(${90 * index + 45})" opacity="1" />`).join('\n')}
                <rect x="-33" y="-33" width="66" height="66" fill="none" stroke="white" stroke-width="2" rx="5" ry="5" transform="rotate(45)" opacity="1" />
                <text x="0" y="20" font-size="60" font-family="Arial" font-weight="400" text-anchor="middle" fill="black" opacity="0">4</text>
                <polygon points="
                    0,28 2,2 28,0 2,-2 0,-28 -2,-2 -28,0 -2,2
                " fill="black" stroke="black" stroke-width="3" />
            </g>\n`;
        }
    }
}

// M 0,38 l 0,-76





const OUTPUT_SVG = `<svg viewBox="-800 -1200 ${800 * 2} ${1200 * 2}" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2025 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}

    <mask id="MASK__SUPER_MAIN_CONTENT">
    ${SVG_CONTENT_MAIN}
    </mask>
</defs>

<rect x="-800" y="-1200" width="${800 * 2}" height="${1200 * 2}"  fill="#EEEEEE" opacity="${0.0}"  />


<rect x="-800" y="-1200" width="${800 * 2}" height="${1200 * 2}"  fill="#EEDDCC" opacity="1"  mask="url(#MASK__SUPER_MAIN_CONTENT)" />





</svg>\n`;

console.log(OUTPUT_SVG);

// Build SVG:
// ./make.sh patterns/js/p05.js png

/*
    node nogit/try1.js; rsvg-convert nogit/try1.js.svg -h4000 -o nogit/try1.js.svg.png; ./make.sh nogit/debug1.typ
*/
