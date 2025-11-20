// Goshuin red stamp, 60*90 mm


const fs = require('fs');
const svgplotlib = require('../patterns/svgplotlib.js');


let SVG_DEFS = '';
let SVG_CONTENT_MAIN = '';




function make_dot(posX, posY, attrs) {
    return `<circle cx="${posX}" cy="${posY}" r="150" fill="black" stroke="black" stroke-width="120" ${attrs || ''} />
        <circle cx="${posX}" cy="${posY}" r="150" fill="black" stroke="white" stroke-width="35" ${attrs || ''} />\n`;
};

function make_connection(x1, y1, x2, y2) {
    return `<path d="M ${x1},${y1} L ${x2},${y2}" />\n`;
}




const hexagon_radius = 1800;
const hexagon_magic_number = hexagon_radius / 2;
const hexagon_width = Math.sin(Math.PI / 3) * hexagon_radius;

console.error(`hexagon_width`, hexagon_width);




// Inner canvas and filled background
SVG_DEFS += `<mask id="mask__innerCanvas">
    <g transform="translate(0,-${hexagon_radius / 2})" fill="white">
        <polygon id="uuid_3d13f267ec00"  points="
        0,${-hexagon_radius}
        ${hexagon_width},${-hexagon_magic_number}
        ${hexagon_width},${hexagon_magic_number + hexagon_radius}
        0,${hexagon_radius * 2}
        ${-hexagon_width},${hexagon_magic_number + hexagon_radius}
        ${-hexagon_width},${-hexagon_magic_number}
        " />
    </g>
</mask>
`;
// SVG_CONTENT_MAIN += `<g transform="translate(0,-${hexagon_radius / 2})"
//     fill="white" stroke="black" stroke-width="10">
//     <use href="#uuid_3d13f267ec00" />
// </g>`;






// Reusable control variables
let tmpstr = '';
let TOTAL_STEPS = 80;


// Radiating ray beams
TOTAL_STEPS = 14 * 4;
for (let itr = 0; itr < TOTAL_STEPS; itr++) {

    // let height_offset = Math.cos((0.0 + 4 * ((itr+0.5) / TOTAL_STEPS)) * (Math.PI * 2)) * 100;
    // tmpstr += `<g >
    //     <path d="M 0,420 m 0,${height_offset} l 288,6000 -${288 * 2},0 Z" transform="translate(0,-${hexagon_radius / 2}) rotate(${((itr+0.5) / TOTAL_STEPS) * 360})"
    //     fill="white" stroke="white" stroke-width="20" stroke-linejoin="round" />
    // </g>\n`;
    let height_offset = Math.cos((0.0 + 4 * ((itr + 0.5) / TOTAL_STEPS)) * (Math.PI * 2)) * 120;
    // height_offset += Math.cos((0.5 + 12 * ((itr+0.5) / TOTAL_STEPS)) * (Math.PI * 2)) * +70;
    // let path_content = `M 0,610 m 0,${height_offset} c 0,${4000 * 0.9975} ${3000 * 0.75},4000 3000,4000`;
    let path_content = `M 0,450 m 0,${height_offset} l 210,6000 -${210 * 2},0 Z`;
    // let path_content = `M 0,520  m 0,${height_offset}  ${(new Array(20).fill(1).map((__item, itr) => `l 0,${60 + 12 * itr} m 0,${220 - 4 * itr}`)).join(' ')} Z`;
    tmpstr += `<g >
        <path d="${path_content}" transform="translate(0,-${hexagon_radius * 0.5}) rotate(${((itr + 0.5) / TOTAL_STEPS) * 360})"
        fill="white" stroke="white" stroke-width="22" stroke-linejoin="round" stroke-linecap="round" />
    </g>\n`;
};
SVG_CONTENT_MAIN += `<g mask="url(#mask__innerCanvas)">
    <g id="local_912367475324678_group">
        ${tmpstr}
    </g>
    <g transform="scale(-1,1)" opacity="0">
        <use href="#local_912367475324678_group" />
    </g>
    <path d="M 0,100 L 13,13 100,0 13,-13 0,-100 -13,-13 -100,0 -13,13 Z "
        fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" opacity="1"
        transform="translate(0,-${hexagon_radius * 0.5}) scale(7) scale(1.3,1)" />
    
</g>`;



// Radiating beams, but they are curves
// for (let itr = 0; itr < TOTAL_STEPS; itr++) {
//     let height = Math.cos((0.0 + 4 * (itr / TOTAL_STEPS)) * (Math.PI * 2)) * 250 + 800;
//     tmpstr += `<path d="M 0,100 l 0,${height} M 0,1400 c 0,1000 400,2000 400,2000" transform="translate(0,-${hexagon_radius / 2}) rotate(${(itr / TOTAL_STEPS) * 360})"
//         stroke="black" stroke-width="35" fill="none" />\n`;
// };
// SVG_CONTENT_MAIN += `<g mask="url(#mask__innerCanvas)">
//     <g>${tmpstr}</g>
//     <g transform="scale(-1,1)">${tmpstr}</g>
//     <circle cx="0" cy="-${hexagon_radius / 2}" r="530" fill="black" stroke="white" stroke-width="0" />
// </g>`;



// Like radiating beams, like a cross
// TOTAL_STEPS = 3;
// for (let itr = -TOTAL_STEPS; itr <= TOTAL_STEPS; itr++) {
//     let height = Math.cos((0.0 + 0.25 * (itr / TOTAL_STEPS)) * (Math.PI * 2)) * 250 + 1400;
//     tmpstr += `<path d="M ${75 * itr},400 l 0,${height}" transform="translate(0,-${hexagon_radius / 2})"
//         stroke="black" stroke-width="35" fill="none" />\n`;
// };
// SVG_CONTENT_MAIN += `<g mask="url(#mask__innerCanvas)">
//     <g transform="rotate(0) scale(1,1)"><g>${tmpstr}</g></g>
//     <circle cx="0" cy="-${hexagon_radius / 2}" r="0.330" fill="black" stroke="white" stroke-width="0" />
// </g>`;










// Outer circles in BG
// tmpstr = '';
// TOTAL_STEPS = 20;
// for (let itr = 0; itr < TOTAL_STEPS; itr++) {
//     const results = Array.from({ length: TOTAL_STEPS }, (_, n) => 2100 + 80 * n + 6 * n * n);
//     let radius = results[itr];
//     tmpstr += `<g transform="translate(0,-${hexagon_radius / 2})">
//         <circle cx="0" cy="0" r="${radius}"
//         fill="none"
//         stroke="black" stroke-width="35" />
//     </g>\n`;
// };
// SVG_CONTENT_MAIN += `<g mask="url(#mask__innerCanvas)">${tmpstr}</g>`;




tmpstr = [
    // Top cap
    // make_connection(0, -hexagon_radius, hexagon_width, -hexagon_magic_number),
    // make_connection(0, -hexagon_radius, -hexagon_width, -hexagon_magic_number),

    // // Upper major triangle
    // make_connection(0, hexagon_radius, -hexagon_width, -hexagon_magic_number),
    // make_connection(0, hexagon_radius, hexagon_width, -hexagon_magic_number),
].join('\n');

// function put_connections_content_into_document_stream(contents, options) {
//     if (!options) {
//         options = {};
//     };
//     let { native_scale, v_offset } = options;
//     native_scale = native_scale || 1
//     SVG_CONTENT_MAIN += `<g transform="translate(0,-${v_offset ? v_offset : hexagon_radius / 2})">
//     <g stroke="black" stroke-width="${180/native_scale}">${contents}</g>
//     <g stroke="white" stroke-width="${120/native_scale}">${contents}</g>
//     <g stroke="black" stroke-width="${60/native_scale}">${contents}</g>
//     </g>\n`;
// };
// ChatGPT says that I can have default values in argv definitions
function put_connections_content_into_document_stream(
    contents,
    {
        native_scale = 1,
        v_offset = hexagon_radius / 2,
    } = {} // default to empty object if options not provided
) {
    SVG_CONTENT_MAIN += `<g transform="translate(0,-${v_offset})">
        <g stroke="black" stroke-width="${190 / native_scale}">${contents}</g>
        <g stroke="white" stroke-width="${120 / native_scale}">${contents}</g>
        <g stroke="black" stroke-width="${60 / native_scale}">${contents}</g>
    </g>\n`;
};

// put_connections_content_into_document_stream(tmpstr)











// Hexagon connections
let content__my_connections = [
    make_connection(0, -hexagon_radius, 0, hexagon_radius * 2), // Grand vertical

    // Top cap
    make_connection(0, -hexagon_radius, hexagon_width, -hexagon_magic_number),
    make_connection(0, -hexagon_radius, -hexagon_width, -hexagon_magic_number),

    // // Upper major triangle
    make_connection(0, hexagon_radius, -hexagon_width, -hexagon_magic_number),
    make_connection(0, hexagon_radius, hexagon_width, -hexagon_magic_number),

    // Bottom cap
    make_connection(0, hexagon_radius * 2, hexagon_width, hexagon_magic_number + hexagon_radius),
    make_connection(0, hexagon_radius * 2, -hexagon_width, hexagon_magic_number + hexagon_radius),

    // Middle chevron-down
    // make_connection(0, hexagon_radius, -hexagon_width, hexagon_magic_number),
    // make_connection(0, hexagon_radius, hexagon_width, hexagon_magic_number),

    // Middle chevron-up
    // make_connection(0, 0, -hexagon_width, hexagon_magic_number),
    // make_connection(0, 0, hexagon_width, hexagon_magic_number),

    make_connection(hexagon_width, -hexagon_magic_number, -hexagon_width, -hexagon_magic_number), // Top horizontal
    // make_connection(hexagon_width, hexagon_magic_number + hexagon_radius, -hexagon_width, hexagon_magic_number + hexagon_radius), // Bottom horizontal
    make_connection(hexagon_width, hexagon_magic_number, -hexagon_width, hexagon_magic_number), // Middle horizontal

    make_connection(-hexagon_width, -hexagon_magic_number, -hexagon_width, hexagon_magic_number + hexagon_radius), // Vertical left
    make_connection(hexagon_width, -hexagon_magic_number, hexagon_width, hexagon_magic_number + hexagon_radius), // Vertical right
].join('');


put_connections_content_into_document_stream(content__my_connections)






// Neko ears?
let __tmp_scaleFactor = 3.8971;
// let __tmp_scaleFactor = 3.80; // Smaller?
// let __tmp_scaleFactor = 3.0; // Even Smaller?
tmpstr = `<g fill="none" stroke-linejoin="round">
    <path d="M 0 357 C 0 171 126 0 182 0 C 220 0 266 143 266 143 S 290 124 400 124   M 0 357 C 0 523 202 600 400 600 " transform="scale(${__tmp_scaleFactor},${__tmp_scaleFactor}) translate(-400,-357)" />
    <path d="M 0 357 C 0 171 126 0 182 0 C 220 0 266 143 266 143 S 290 124 400 124   M 0 357 C 0 523 202 600 400 600 " transform="scale(-${__tmp_scaleFactor},${__tmp_scaleFactor}) translate(-400,-357)" />
    
</g>`;
// SVG_CONTENT_MAIN += `<g transform="translate(0,${(-hexagon_radius + 380) * 0})">
//     <g mask="url(#mask__innerCanvas)" fill="none" stroke-linejoin="round">
//         <g stroke="black" stroke-width="50">${tmpstr}</g>
//         <g stroke="white" stroke-width="30">${tmpstr}</g>
//         <g stroke="black" stroke-width="10">${tmpstr}</g>
//     </g>
//     <circle cx="0" cy="0" r="400" fill="none" />
// </g>`;
put_connections_content_into_document_stream(tmpstr, { native_scale: __tmp_scaleFactor, v_offset: '0' });




// Major dots
SVG_CONTENT_MAIN += `<g transform="translate(0,-${hexagon_radius / 2})">
    ${[
        make_dot(0, 0),
        make_dot(0, hexagon_radius),
        make_dot(0, -hexagon_radius),
        make_dot(hexagon_width, hexagon_magic_number),
        make_dot(-hexagon_width, hexagon_magic_number),
        make_dot(hexagon_width, -hexagon_magic_number),
        make_dot(-hexagon_width, -hexagon_magic_number),
        // Lower part
        make_dot(hexagon_width, hexagon_magic_number + hexagon_radius),
        make_dot(-hexagon_width, hexagon_magic_number + hexagon_radius),
        make_dot(0, hexagon_radius * 2),
    ].join('')}
</g>\n`;





// Center star
// SVG_CONTENT_MAIN += `<g transform="translate(0,-${hexagon_radius / 2})" fill="white">
// <g id="local__7e6da975a06e_rawMiniStar">
// ${svgplotlib.drawstar({
//     vert: 6, long: 390, short: 120, attrs: {}
// })}
// </g>
//     <g id="local__88e0938875fe__single">
//         <g transform="rotate(0)">
//             <use href="#local__7e6da975a06e_rawMiniStar" fill="black" stroke="black" stroke-width="30" stroke-linejoin="rounded" transform="scale(1.25)" />
//             <use href="#local__7e6da975a06e_rawMiniStar" fill="white" stroke="white" stroke-width="30" stroke-linejoin="rounded" transform="scale(1.00)" />
//         </g>
//     </g>
//     <use href="#local__88e0938875fe__single" transform="rotate(60) scale(1.01)" />
// </g>`;
// ${make_dot(0, 0)}









let banner_nominal_semi_width = 1300;
SVG_CONTENT_MAIN += `<g fill="white" stroke="black" stroke-width="50" transform="translate(0,1180)">
    <g id="local_a44e0e798067_bannerSide">
        <polygon transform="translate(${banner_nominal_semi_width - 100},170)" fill="white" points="
            0,0     400,10   250,400     370,800     0,${800*0.96}
        " />
    </g>
    <use href="#local_a44e0e798067_bannerSide" transform="scale(-1,1)" />
    <rect x="-${banner_nominal_semi_width}" y="0" width="${banner_nominal_semi_width * 2}" height="800"  />
</g>
`;







let __fontFamily = 'Instrument Serif';
let __fontSizeBase = 420;
let __lineSkip = 600;
let __lineBase = 1100;
// __fontFamily = 'Hubot-Sans'; __fontSizeBase = 310;
// __fontFamily = 'Geist'; __fontSizeBase = 320; __lineSkip = __fontSizeBase * 1.11; __lineBase = 1430;
__fontFamily = 'Hubot-Sans'; __fontSizeBase = 295; __lineSkip = __fontSizeBase * 0.9; __lineBase = 1550;
// __fontFamily = 'Nunito'; __fontSizeBase = 310; __lineSkip = __fontSizeBase * 1.2; __lineBase = 1400;
// __fontFamily = 'Inter Tight'; __fontSizeBase = 310; __lineSkip = __fontSizeBase * 1.4; __lineBase = 1450;
let __mainTextContent = `NEKO!AND!KUMA ARE!FRIENDS!FOREVER`.split(' ').map((word, itr) => {
    return `<text x="0" y="0" text-anchor="middle"
        transform="translate(0,${itr * __lineSkip + __lineBase}) scale(0.9,1.0025)"
        font-family="${__fontFamily}"
        font-weight="500"
        font-size="${(__fontSizeBase * (1 - 0.29 * itr)).toFixed(0)}"
        fill="black"
        stroke-linejoin="round"
        word-spacing="0.03em"
    >${word.split('!').join(' ')}</text>`;
}).join('\n');
// SVG_CONTENT_MAIN += `<g stroke="black" stroke-width="145">${__mainTextContent}</g>\n`;
// SVG_CONTENT_MAIN += `<g stroke="white" stroke-width="85">${__mainTextContent}</g>\n`;
// SVG_CONTENT_MAIN += `<g stroke="black" stroke-width="10">${__mainTextContent}</g>\n`;
// SVG_CONTENT_MAIN += `<g stroke="white" stroke-width="145">${__mainTextContent}</g>
// <g stroke="black" stroke-width="85">${__mainTextContent}</g>
// <g stroke="white" stroke-width="10">${__mainTextContent}</g>\n`;
SVG_CONTENT_MAIN += `<g stroke="black" stroke-width="15">${__mainTextContent}</g>\n`;













const OUTPUT_SVG = `<svg viewBox="-2000 -3000 ${2000 * 2} ${3000 * 2}" xmlns="http://www.w3.org/2000/svg">
<desc>Copyright (c) 2025 Nekostein, an unincorporated game development team. All rights reserved.</desc>

<defs>
    ${SVG_DEFS}

    <mask id="MASK__SUPER_MAIN_CONTENT">
    ${SVG_CONTENT_MAIN}
    </mask>
</defs>

<rect x="-2000" y="-3000" width="4000" height="6000"  fill="#EEEEEE" opacity="${0}"  />


<rect x="-2000" y="-3000" width="4000" height="6000"  fill="red" opacity="1"  mask="url(#MASK__SUPER_MAIN_CONTENT)" />





</svg>\n`;

fs.writeFileSync(process.argv[1] + '.svg', OUTPUT_SVG);
