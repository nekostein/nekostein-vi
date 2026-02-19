// ALLESISTRICHTIGMITDERWELT
// const RAW_CODE_SEQ = `.- .-.. .-.. . ... .. ... - .-. .. -.-. .... - .. --. -- .. - -.. . .-. .-- . .-.. -`;


// NEKOANDKUMAAREFRIENDSFOREVER
const RAW_CODE_SEQ = process.env.MSG || `-. . -.- --- .- -. -.. -.- ..- -- .- .- .-. . ..-. .-. .. . -. -.. ... ..-. --- .-. . ...- . .-.`;

// const CONVERT_MAP = {
//     '-': process.env.LONG || '\\rule{9pt}{1pt}~',
//     '.': process.env.SHORT || '\\rule{4pt}{1pt}~',
//     ' ': process.env.SPACE || '~~',
//     '/': '~~~~~~',
// }
const CONVERT_MAP = {
    '-': process.env.LONG || '#box(width: 4fr, height: 0.8pt, fill: black)~',
    '.': process.env.SHORT || '#box(width: 1.5fr, height: 0.8pt, fill: black)~',
    ' ': process.env.SPACE || '~~',
    '/': '~~~~',
}

console.log(
    RAW_CODE_SEQ.split('').map(x => CONVERT_MAP[x]).join('').replace(/~$/, '').replace(/~/g, '#h(1fr)')
);


// node misc/morsecode.js | pbcopy
// LONG=- SHORT=. SPACE=' ' node misc/morsecode.js | pbcopy
