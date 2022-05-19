const svgo = require('svgo');
const svgoConfig = require('./config');
const { parse, stringify } = require('svgson');
 
async function normalizeSVG(svgString) {
    const data = svgo.optimize(svgString).data;

    let el = await parse(data);

    let { attributes } = el;

    let { width, height, viewBox } = attributes;

    if (!viewBox && !(width && height)) {
        log.error(file, "doesn't contain a valid size declaration.");
    } else if (viewBox) {
        [, width, height] = (viewBox.match(/0 0 (\d+) (\d+)/) || []).map(
            (size) => parseInt(size, 10)
        );
    } else {
        attributes.viewBox = `0 0 ${width} ${height}`;
    } 
    return stringify(el);
}
exports.normalizeSVG = normalizeSVG; 