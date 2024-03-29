const { genLess } = require('./genLess');
const { genCss } = require('./genCss');

exports.genHtml = (props) => {
    const { fontName, rawSvgArray } = props;

    const lessCode = genLess(props);
    const cssCode = genCss(props);
    const icons = rawSvgArray
        .map(({ className }) => {
            return `<span class="${fontName} ${fontName}_${className}"></span>`;
        })
        .join('');
    return `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>${fontName} Demo 兼容到ie8</title>
	<style>
    	body {
			font-family: sans-serif;
			margin: 0;
			padding: 10px 20px;
		}
		.${fontName} {
			padding: 6px;
			background: #DDD;
			border: solid 3px #DDD;
			border-radius: 2px;
			cursor: pointer;
			margin: 4px;
			display: inline-block;
		}
		${cssCode}
	</style>


</head>

<body>
	<h1>${fontName}</h1>
	${icons}
	<h1>less code</h1>
	<pre>
		<code class="less">
		${lessCode}
		</code>
	</pre>
	<h1>css code</h1>
	<pre>
		<code class="css">
		${cssCode}
		</code>
	</pre>
</body>

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
</html>
    
    `;
};
