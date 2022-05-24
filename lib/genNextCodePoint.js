/**
 * Unicode Private Use Area start.
 * http://en.wikipedia.org/wiki/Private_Use_(Unicode) 0xf101;
 * @type {Number}
 */
const UNICODE_PUA_START = 0xe600; // 历史遗留原因 期望是 0xf101;
/**
 * 兼容历史数据
 *
 * @param {*} unicodeStart
 * @param {*} offset
 * @return {*}
 */
function getQuirksNextCodepoint(unicodeStart, offset) {
    unicodeStart =
        unicodeStart.toString(16).substring(0, 1) +
        (parseInt(unicodeStart.toString(16).substr(1)) + offset);
    unicodeStart = parseInt(unicodeStart, 16);

    return unicodeStart;
}

function genNextCodePoint(offset, quirks) {
    if (quirks) {
        return getQuirksNextCodepoint(UNICODE_PUA_START, offset);
    }
    return UNICODE_PUA_START + offset;
}

exports.genNextCodePoint = genNextCodePoint;
