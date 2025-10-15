const fs = require('fs');
const svgplotlib = require('../../patterns/svgplotlib.js');


let SVG_DEFS = '';
let SVG_CONTENT_MAIN = '';


SVG_CONTENT_MAIN += `<g>` + (function () {
    const __total_steps = 60;
    let tmpstr = '';
    for (let step = 0; step < __total_steps; step++) {
        let distance = 2100;
        // Outer solid dots
        // tmpstr += `<polygon points="0,120 290,0 0,-340 -290,0" transform="rotate(${step / __total_steps * 360}) translate(0,${distance})" />\n`;
        let path_data = `
            M 0 0 C 97 0 97 -97 97 -97 q 0 -319 -580 -885
        `;
        let path_attrs = `  fill="none" stroke="black" stroke-width="40" stroke-linejoin="round" stroke-linecap="round"  `;
        tmpstr += `<path d="${path_data}" ${path_attrs} transform="rotate(${step / __total_steps * 360}) translate(0,${distance})" />\n`;
        tmpstr += `<path d="${path_data}" ${path_attrs} transform="rotate(${step / __total_steps * 360}) translate(0,${distance}) scale(-1,1)" />\n`;
        // Inner hollow dots
        // tmpstr += `<polygon fill="none" stroke="black" stroke-width="40" stroke-linejoin="round" points="0,182 99,0 0,-66 -99,0" transform="rotate(${(step + 0.5) / __total_steps * 360}) translate(0,${distance - 390})" />\n`;
    };
    return tmpstr;
})() + `</g>`;


SVG_CONTENT_MAIN += svgplotlib.drawstar({ vert: 24, short: 1275, long: 1275 * 1.16, attrs: { fill: 'white', stroke: 'black', 'stroke-width': '50' } });
SVG_CONTENT_MAIN += svgplotlib.drawstar({ vert: 24, short: 1195, long: 1195 * 1.16, attrs: { fill: 'black' } });



const OUTPUT_SVG = `<svg viewBox="-2150 -2150 ${2150 * 2} ${2150 * 2}" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}
</defs>
<circle cx="0" cy="0" r="2150" stroke="none" stroke-width="0" fill="#EEEEEE" opacity="0" />

${SVG_CONTENT_MAIN}

<circle cx="0" cy="0" r="1950" stroke="white" stroke-width="50" fill="none" opacity="0" />



</svg>`;

fs.writeFileSync(process.argv[1] + '.svg', OUTPUT_SVG);
