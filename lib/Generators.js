const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const ttf2woff2 = require('ttf2woff2');
const { Readable } = require('stream');

class Generators {
    rawArray = [
        {
            raw: null,
            name: null,
            codePoint: null,
        },
    ];
    option = {
        fontName: 'icon',
    };
    assets = {
        svg: null,
        ttf: null,
        woff: null,
        woff2: null,
        eot: null,
    };

    constructor(rawArray, option) {
        this.rawArray = rawArray;
        this.option = {
            ...this.option,
            ...option,
        };
    }

    async gen() {
        const svgFontString = await this.genSvg();
        this.assets.svg = svgFontString;

        const ttfFontBuffer = await this.genTtfBuffer(svgFontString);
        this.assets.ttf = ttfFontBuffer;

        const woffFontBuffer = await this.genWoffBuffer(ttfFontBuffer);
        this.assets.woff = woffFontBuffer;

        const woff2FontBuffer = await this.genWoff2Buffer(ttfFontBuffer);
        this.assets.woff2 = woff2FontBuffer;

        const eotFontBuffer = await this.genEotBuffer(ttfFontBuffer);
        this.assets.eot = eotFontBuffer;
    }

    genSvg() {
        return new Promise((resolve, reject) => {
            let font = Buffer.alloc(0);
            let errors = [];
            const fontStream = new SVGIcons2SVGFontStream({
                fontName: this.option.fontName,
                centerHorizontally: false,
                centerVertically: false,
                fontHeight: 512,
                descent: 0,
                normalize: true,
                round: 10e12,
            });
            fontStream
                .on('data', function (data) {
                    font = Buffer.concat([font, data]);
                })
                .on('finish', function (res) {
                    if (errors.length) {
                        reject(new Error(JSON.stringify(errors)));
                    } else {
                        resolve(font.toString());
                    }
                })
                .on('error', (error) => {
                    errors.push(error.message);
                });
            this.rawArray.forEach(({ raw, name, codePoint }) => {
                const glyph = Readable.from(raw);
                const unicode = String.fromCharCode(codePoint);
                glyph.metadata = {
                    unicode: [unicode],
                    name,
                };
                fontStream.write(glyph);
            });
            fontStream.end();
        });
    }
    genTtfBuffer(svgFont) {
        return Promise.resolve(Buffer.from(svg2ttf(svgFont).buffer));
    }
    genWoffBuffer(ttfFontBuffer) {
        return Promise.resolve(
            Buffer.from(ttf2woff(new Uint8Array(ttfFontBuffer)).buffer)
        );
    }
    genWoff2Buffer(ttfFontBuffer) {
        return Promise.resolve(
            Buffer.from(ttf2woff2(new Uint8Array(ttfFontBuffer)).buffer)
        );
    }
    genEotBuffer(ttfFontBuffer) {
        return Promise.resolve(
            Buffer.from(ttf2eot(new Uint8Array(ttfFontBuffer)).buffer)
        );
    }
}
module.exports = Generators;
