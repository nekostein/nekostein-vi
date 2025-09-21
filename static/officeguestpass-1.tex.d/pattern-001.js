const fs = require('fs');

let SVG_DEFS = '';
let SVG_CONTENT = '';
let SVG_CONTENT_MASK = '';

let repeats = 36;
for (let itr = 0; itr < repeats; itr++) {
    let angle = itr / repeats * 360;
    SVG_CONTENT_MASK += `<ellipse cx="0" cy="700" rx="410" ry="700" stroke="black" stroke-width="15" fill="none" transform="rotate(${angle})" />`;
}


let SGV_OUTPUT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1000 -1000 2000 2000">
    <defs>
        ${SVG_DEFS}
        <mask id="major_black_mask">
            <rect x="-1004" y="-1004" width="2008" height="2008" fill="white"  />
            ${SVG_CONTENT_MASK}
        </mask>
    </defs>

    <rect x="-1004" y="-1004" width="2008" height="2008" fill="black" mask="url(#major_black_mask)" />

</svg>
`;


const svg_path = process.argv[1] + '.svg';
fs.writeFileSync(svg_path, SGV_OUTPUT);

// node static/office1daypass-1.tex.d/pattern-001.js
