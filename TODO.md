- 保证svg 顺序：文件命名规则 000[文件索引，000->999]-文件名 ✅
- 设置项目名称 兼容老项目 ✅
- startCodepoint  0xE600 兼容老项目 ✅
- font-height waring ✅
- 对比生成的svg
    - A fontHeight of at least than 1000 is recommended, otherwise further steps (rounding in svg2ttf) could lead to ugly results. Use the fontHeight option to scale icons.
    - unicode 结果为16进制 是否正常 ⚠️以前代码逻辑错误，不用修改 ✅
- 废弃otf 以前就没有生成 ✅
- 统一处理图标 使用svgo ✅
- 支持symbol
- 生成模版
    - css 模版
    - html 模版 ✅
    - less 模版
- 测试浏览器兼容性
```
 src: url("{{fontName}}.eot?#iefix") format("embedded-opentype"), ie
        url("{{fontName}}.woff2") format("woff2"),
        url("{{fontName}}.woff") format("woff"),
        url("{{fontName}}.ttf") format("truetype"),
        url("{{fontName}}.svg#{{fontName}}") format("svg"); 
```
- 可视化工具
```
// project
{
    id: 1,
    name: '中文名', // unique
    fontName: '字体名称，一般以icons结尾（现有项目是这样的）'
}
// glyph
{
    id: '1',
    projectId: '1',
    name: '中文名',
    className: 'className',
    svg: '', // 最开始的svg
    optimizedSvg: '', // 优化之后的svg，生成字体使用优化之后的svg
}
```