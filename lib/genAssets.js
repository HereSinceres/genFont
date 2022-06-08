
const path = require('path');
const { genLess } = require('./render/genLess');
const { genHtml } = require('./render/html');
const { writeFile } = require('./util/writeFile');

async function genAssets(assets, dest, fontName, rawSvgArray) {
    Object.entries(assets).forEach(async ([fileType, value]) => {
        await writeFile(
            path.resolve(dest, `./${fontName}.${fileType}`),
            value
        );
    });
    await writeFile(
        path.resolve(dest, `./${fontName}.html`),
        genHtml({
            fontName,
            rawSvgArray,
        })
    );
    await writeFile(
        path.resolve(dest, `./styles.less`),
        genLess({
            fontName,
            rawSvgArray,
        })
    );
}
exports.getAssets = genAssets;
