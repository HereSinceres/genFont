const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

exports.genHtml = ({ fontName, rawSvgArray }) => {
    const source = fs.readFileSync(
        path.resolve(__dirname, './html.hbs'),
        'utf8'
    );
    return handlebars.compile(source)({
        fontName: fontName,
        rawSvgArray: rawSvgArray,
    });
};
