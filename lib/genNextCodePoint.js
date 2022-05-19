
/**
 * 兼容历史数据
 *
 * @param {*} unicodeStart
 * @param {*} offset
 * @return {*} 
 */
function getQuirksNextCodepoint(unicodeStart, offset) {
    unicodeStart = (unicodeStart.toString(16)).substring(0, 1) + (parseInt(unicodeStart.toString(16).substr(1)) + offset);
    unicodeStart = parseInt(unicodeStart, 16);

    return unicodeStart;
}

function genNextCodePoint(unicodeStart, offset, quirks) {
    if (quirks) {
      return  getQuirksNextCodepoint(unicodeStart, offset)

    }
    return unicodeStart + offset;
}

exports.genNextCodePoint = genNextCodePoint;
