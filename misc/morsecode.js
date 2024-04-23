const RAW_CODE_SEQ = `.- .-.. .-.. . ... .. ... - .-. .. -.-. .... - .. --. -- .. - -.. . .-. .-- . .-.. -`;

// NEKOSTEIN
// NEKOUNDKUMASINDTOMODACHIFOREVER
// ALLESISTRICHTIGMITDERWELT

const CONVERT_MAP = {
    '-': '\\rule{9pt}{1pt}~',
    '.': '\\rule{4pt}{1pt}~',
    ' ': '~~',
    '/': '~~~~~~',
}

console.log(RAW_CODE_SEQ.split('').map(x => CONVERT_MAP[x]).join(''));
