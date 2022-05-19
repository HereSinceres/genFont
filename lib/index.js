const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');
const Generators = require('./generators');
const { getAssets } = require("./genAssets");
const { normalizeSVG } = require('./normalizeSVG');
const { genNextCodePoint } = require("./genNextCodePoint");
/**
 * Unicode Private Use Area start.
 * http://en.wikipedia.org/wiki/Private_Use_(Unicode) 0xf101;
 * @type {Number}
 */
const UNICODE_PUA_START = 0xe600;// 历史遗留原因 期望是 0xf101; 

module.exports = async (
    src = path.resolve(process.cwd(), './svgs'),
    fontName = 'wiki-lemma-icons',
    quirks = true
) => {
    console.log(path.resolve(src))
    // svg图标排序、整理
    const fileArray = fs
        .readdirSync(path.resolve(src))
        .filter((file) => {
            return path.extname(file) === '.svg';
        })
        .sort((a, b) => {
            return (
                path.basename(a, path.extname(a)) -
                path.basename(b, path.extname(b))
            );
        });

    const rawSvgPromise = fileArray.map(async (file, index) => {
        const svgString = fs
            .readFileSync(path.resolve(path.resolve(src), file))
            .toString();
        const codePoint = genNextCodePoint(UNICODE_PUA_START, index, quirks);
        const raw = await normalizeSVG(svgString);
        return {
            raw,
            name: path.basename(file, path.extname(file)),
            className: path
                .basename(file, path.extname(file))
                .replace(/^\d{1,}-/, ''),
            codePoint: codePoint,
            codePoint16: codePoint.toString(16),
        }
    });
    const rawSvgArray = await Promise.all(rawSvgPromise);

    // 生成字体文件
    const genIns = new Generators(rawSvgArray, { fontName });
    await genIns.gen();
    const dest = `./temp/${randomUUID()}`;
    await getAssets(genIns.assets, dest, fontName, rawSvgArray);
};
 


