const fs = require('fs');

// 读取文件
const filePath = 'ai-navigation-hub-clean.html';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // 检查并修复编码问题
  let fixedData = data;
  
  // 修复常见的中文编码问题
  const encodingFixes = [
    { from: 'AI瀵艰埅', to: 'AI导航' },
    { from: '椋庢牸', to: '风格' },
    { from: '绀轰緥', to: '示例' },
    { from: '寮曞叆', to: '引入' },
    { from: '搴撶敤浜', to: '库用于' },
    { from: '鐎戝竷娴侀噰灞€', to: '瀑布流布局' },
    { from: '鏁告暣', to: '整理' },
    { from: '婧愮爜', to: '源码' },
    { from: '鐘舵€佸浘', to: '状态图' },
    { from: '鑱旂郴', to: '联系' },
    // 添加更多需要修复的编码
  ];

  // 应用所有修复
  encodingFixes.forEach(fix => {
    fixedData = fixedData.replace(new RegExp(fix.from, 'g'), fix.to);
  });

  // 修复 <body> 标签中可能存在的编码问题
  if (fixedData.includes('<body data-theme="light">')) {
    console.log('Found body tag with encoding issues, trying to fix...');
    
    // 提取HTML体和头部
    const headEndIndex = fixedData.indexOf('</head>') + 7;
    const headContent = fixedData.substring(0, headEndIndex);
    const bodyContent = fixedData.substring(headEndIndex);
    
    // 写入修复后的文件
    fs.writeFile('ai-navigation-fixed.html', headContent + '\n<body data-theme="light">\n' + bodyContent.substring(bodyContent.indexOf('>') + 1), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('File was successfully fixed and saved as ai-navigation-fixed.html');
    });
  } else {
    // 如果没有发现特定的编码问题，则尝试重新编码整个文件
    fs.writeFile('ai-navigation-fixed.html', fixedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('File was successfully re-encoded and saved as ai-navigation-fixed.html');
    });
  }
}); 