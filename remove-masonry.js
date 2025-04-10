const fs = require('fs');

// 读取HTML文件
const content = fs.readFileSync('all-grid-layout.html', 'utf8');

// 使用字符串替换删除masonry相关元素
let newContent = content;
newContent = newContent.replace(/<div class="masonry-sizer"><\/div>/g, '');
newContent = newContent.replace(/<div class="masonry-gutter"><\/div>/g, '');

// 写入新文件
fs.writeFileSync('all-grid-fixed.html', newContent);

console.log('处理完成：all-grid-fixed.html'); 