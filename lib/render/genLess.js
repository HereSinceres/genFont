exports.genLess = ({ fontName, rawSvgArray }) => {
    return `
    .cmn-font-smoothing(){
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .cmn-font-face(@fontSrc; @fontWeight: normal; @fontStyle: normal; @fontFamilyName) when (isstring(@fontFamilyName)){
      @filePath: replace(@fontSrc, '^(.*?)(?:\.\w+)?$', '$1');
      
      @font-face{
        font-family : @fontFamilyName;
        src       : url('@{filePath}.eot?#iefix');
        src       : url('@{filePath}.eot?#iefix') format('embedded-opentype'),
                url('@{filePath}.woff2') format('woff2'),
                url('@{filePath}.woff') format('woff'),
                url('@{filePath}.ttf') format('truetype'),
                url('@{filePath}.otf') format('opentype'),
                url('@{filePath}.svg') format('svg');
        font-weight : @fontWeight;
        font-style  : @fontStyle;
      }
    }
    
    .cmn-font-face(@fontSrc; @fontWeight: normal; @fontStyle: normal){
      @fontFamilyName: replace(@fontSrc, '^.*?([-\w]+)(?:\.\w+)?$', 'baikeFont_$1');
      
      .cmn-font-face(@fontSrc; @fontWeight; @fontStyle; @fontFamilyName);
    }
    
    .cmn-font(@fontSrc; @className; @fontWeight: normal; @fontStyle: normal; @fontFamilyName) when (isstring(@fontFamilyName)){
      .cmn-font-face(@fontSrc; @fontWeight; @fontStyle; @fontFamilyName);
      .@{className}{
        font-family: @fontFamilyName;
        font-weight : @fontWeight;
        font-style  : @fontStyle;
      }
    }
    
    .cmn-font(@fontSrc; @className; @fontWeight: normal; @fontStyle: normal){
      @fontFamilyName: replace(@fontSrc, '^.*?([-\w]+)(?:\.\w+)?$', 'baikeFont_$1');
    
      .cmn-font(@fontSrc; @className; @fontWeight; @fontStyle; @fontFamilyName);
    }
    
    ._generate-font-icon-class(@className; @iconNames; @i: 1) when(@i < length(@iconNames) + 1){
      @subClassName: extract(@iconNames, @i);
      .@{className}_@{subClassName}{
        @glyph: 599 + @i;
    
        *zoom: expression(~'this.runtimeStyle["zoom"] = "1",this.innerHTML += "&#xe@{glyph};"');
        &:before{
        content: '\\e@{glyph}';
        }
      }
      ._generate-font-icon-class(@className; @iconNames; (@i + 1));
    }
    .cmn-font-icon(@fontSrc; @className; @iconNames){
      .cmn-font(@fontSrc; @className);
      ._generate-font-icon-class(@className; @iconNames);
    }
    
    
    .cmn-font-icon('./${fontName}'; ${fontName};
        ${rawSvgArray.map((i) => i.className).join(',')}
    );`;
};
