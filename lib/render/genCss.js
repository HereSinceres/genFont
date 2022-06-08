exports.genCss = ({ fontName, rawSvgArray }) => {
    const iconCls = rawSvgArray
        .map((glyph) => {
            const { className, codePoint16 } = glyph;
            return `
				.${fontName}_${className} {
					*zoom: expression(this.runtimeStyle['zoom'] = '1',this.innerHTML += '&#x${codePoint16};');
				}
				.${fontName}_${className}:before {
					content: '\\${codePoint16}';
				}
			`;
        })
        .join('');
    return `
		@font-face {
			font-family: '${fontName}';
			src: url('${fontName}.eot?#iefix'); /* IE9 */
			src: url('${fontName}.eot?#iefix') format('embedded-opentype'),   /* IE6-IE8 */
				url('${fontName}.woff2') format('woff2'),
				url('${fontName}.woff') format('woff'),
				url('${fontName}.ttf') format('truetype'),    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
				url('${fontName}.svg#${fontName}') format('svg');  /* iOS 4.1- */
		}
	
   		.${fontName} {
			font-family: '${fontName}';
			font-weight: normal;
			font-style: normal;
			font-size: 16px;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
		${iconCls}
		`;
};
