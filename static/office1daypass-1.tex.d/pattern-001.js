const fs = require('fs');

let SVG_DEFS = '';
let SVG_CONTENT = '';

let repeats = 36;
for (let itr = 0; itr < repeats; itr++) {
    let angle = itr / repeats * 360;
    SVG_CONTENT += `<ellipse cx="0" cy="700" rx="410" ry="700" stroke="white" stroke-width="15" fill="none" transform="rotate(${angle})" />`;
}


let SGV_OUTPUT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1000 -1000 2000 2000">
    <defs>
        ${SVG_DEFS}
    </defs>

    <rect x="-1000" y="-1000" width="2000" height="2000" fill="#000000" />

    ${SVG_CONTENT}
</svg>
`;


const svg_path = process.argv[1] + '.svg';
fs.writeFileSync(svg_path, SGV_OUTPUT);

// node static/office1daypass-1.tex.d/pattern-001.js
