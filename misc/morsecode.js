// ALLESISTRICHTIGMITDERWELT
// const RAW_CODE_SEQ = `.- .-.. .-.. . ... .. ... - .-. .. -.-. .... - .. --. -- .. - -.. . .-. .-- . .-.. -`;


// NEKOANDKUMAAREFRIENDSFOREVER
const RAW_CODE_SEQ = process.env.MSG || `-. . -.- --- .- -. -.. -.- ..- -- .- .- .-. . ..-. .-. .. . -. -.. ... ..-. --- .-. . ...- . .-.`;

const CONVERT_MAP = {
    '-': process.env.LONG || '\\rule{9pt}{1pt}~',
    '.': process.env.SHORT || '\\rule{4pt}{1pt}~',
    ' ': process.env.SPACE || '~~',
    '/': '~~~~~~',
}

console.log(RAW_CODE_SEQ.split('').map(x => CONVERT_MAP[x]).join('').replace(/~$/, ''));
