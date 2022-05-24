const fs = require('fs');
const path = require('path');
const Generators = require('./generators');
const { getAssets } = require('./genAssets');
const { normalizeSVG } = require('./normalizeSVG');
const { genNextCodePoint } = require('./genNextCodePoint');
const { v4: uuidv4 } = require('uuid');

module.exports = async (
    src = path.resolve(process.cwd(), './svgs'),
    fontName = 'wiki-lemma-icons',
    quirks = true
) => {
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
        const codePoint = genNextCodePoint(index, quirks);
        const raw = await normalizeSVG(svgString);
        return {
            raw,
            name: path.basename(file, path.extname(file)),
            className: path
                .basename(file, path.extname(file))
                .replace(/^\d{1,}-/, ''),
            codePoint: codePoint,
            codePoint16: codePoint.toString(16),
        };
    });
    const rawSvgArray = await Promise.all(rawSvgPromise);

    // 生成字体文件
    const genIns = new Generators(rawSvgArray, { fontName });
    await genIns.gen();
    const dest = `./temp/${uuidv4()}`;
    await getAssets(genIns.assets, dest, fontName, rawSvgArray);
};
