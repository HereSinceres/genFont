# QuickStart

使用svg 生成字体文件

Features:
- Supported font formats: WOFF2, WOFF, EOT, TTF and SVG.

参数说明
- src [必填] svg存放的目录 svg文件命名格式 001-close.svg  001代表顺序，为了保证生成的字体的unicode可控
- fontName [必填]
- quirks [可选] 百科专用（主要是设置codePoint区别（为了兼容老项目配置），如果是新项目可以忽略）
```
npx gen-font --src ./svgs --fontName font-ui quirks  
```

执行命令之后会在命令执行目录生成一个temp文件，里面有字体demo