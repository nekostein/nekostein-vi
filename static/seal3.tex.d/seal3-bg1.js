const fs = require('fs');

let SVG_DEFS = '';
let SVG_CONTENT_MAIN = '';


SVG_CONTENT_MAIN += `<g>` + (function () {
    const __total_steps = 24;
    let tmpstr = '';
    for (let step = 0; step < __total_steps; step++) {
        let distance = 2000 + Math.cos(12 * (step / __total_steps * 2 * Math.PI)) * 0;
        // Outer solid dots
        tmpstr += `<polygon points="0,120 290,0 0,-340 -290,0" transform="rotate(${step / __total_steps * 360}) translate(0,${distance})" />\n`;
        // Inner hollow dots
        tmpstr += `<polygon fill="none" stroke="black" stroke-width="40" points="0,182 99,0 0,-66 -99,0" transform="rotate(${(step+0.5) / __total_steps * 360}) translate(0,${distance - 390})" />\n`;
        if (step % 2 === 0) {
            // Inner ring
            tmpstr += `<path d="M 340,0 L 0,244 -340,0" fill="none" stroke="black" stroke-width="40" transform="rotate(${step / __total_steps * 360}) translate(0,${distance - 780})" />\n`;
            tmpstr += `<path d="M 340,0 L 0,244 -340,0" fill="none" stroke="black" stroke-width="160" transform="rotate(${step / __total_steps * 360}) translate(0,${distance - 780 - 200})" />\n`;
        }
    };
    return tmpstr;
})() + `</g>`;




const OUTPUT_SVG = `<svg viewBox="-2150 -2150 ${2150*2} ${2150*2}" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2024 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}
</defs>


${SVG_CONTENT_MAIN}

<circle cx="0" cy="0" r="1950" stroke="white" stroke-width="50" fill="none" opacity="1" />



</svg>`;

fs.writeFileSync(process.argv[1] + '.svg', OUTPUT_SVG);
