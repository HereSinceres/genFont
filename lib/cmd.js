

var argv = require('argv-parse')
var genFont = require('./index')
module.exports = () => {
    var args = argv(process.argv.slice(2))
    const { src, fontName, quirks } = args;
    genFont(src, fontName, quirks)
};