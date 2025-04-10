// 调试收藏功能问题
console.log('debug-save.js 已加载');

// 检查脚本加载顺序
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已加载');
    
    // 检查函数是否正确导出到全局范围
    console.log('全局函数检查:');
    console.log('window.saveTool 存在:', typeof window.saveTool === 'function');
    console.log('window.showSavedTools 存在:', typeof window.showSavedTools === 'function');
    console.log('window.removeSavedTool 存在:', typeof window.removeSavedTool === 'function');
    console.log('window.updateSaveButtonStates 存在:', typeof window.updateSaveButtonStates === 'function');
    console.log('window.showToast 存在:', typeof window.showToast === 'function');
    
    // 检查页面元素
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    console.log('找到卡片元素数量:', cardWrappers.length);
    
    const saveButtons = document.querySelectorAll('.save-button');
    console.log('找到保存按钮数量:', saveButtons.length);
    
    const toolbar = document.querySelector('.toolbar');
    console.log('工具栏存在:', !!toolbar);
    
    const savedToolsButton = document.getElementById('saved-tools-button');
    console.log('保存工具按钮存在:', !!savedToolsButton);
    
    // 检查localStorage状态
    try {
        const savedTools = JSON.parse(localStorage.getItem('savedTools') || '[]');
        console.log('已保存工具数量:', savedTools.length);
        if (savedTools.length > 0) {
            console.log('第一个保存的工具:', savedTools[0].name);
        }
    } catch (error) {
        console.error('读取localStorage失败:', error);
    }
    
    // 添加测试按钮
    const testButton = document.createElement('button');
    testButton.textContent = '测试收藏功能';
    testButton.style.position = 'fixed';
    testButton.style.top = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '10px';
    testButton.style.backgroundColor = '#4CAF50';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.cursor = 'pointer';
    
    testButton.addEventListener('click', function() {
        console.log('测试按钮被点击');
        
        if (typeof window.saveTool === 'function') {
            console.log('尝试保存测试工具');
            window.saveTool('测试工具', '这是一个测试', '', '', ['测试标签']);
        } else {
            console.error('window.saveTool 函数不存在!');
        }
    });
    
    document.body.appendChild(testButton);
    
    // 针对具体错误进行检查
    setTimeout(function() {
        // 检查保存按钮事件监听器
        if (saveButtons.length > 0) {
            console.log('检查第一个保存按钮的事件监听器...');
            const firstSaveButton = saveButtons[0];
            
            // 添加测试事件监听器
            firstSaveButton.addEventListener('click', function() {
                console.log('按钮点击事件已触发 - 检查点');
            });
            
            // 模拟点击第一个按钮
            console.log('尝试模拟点击第一个保存按钮');
            firstSaveButton.click();
        }
    }, 1000);
});

// 重写关键函数以添加调试输出
const originalSaveTool = window.saveTool;
if (originalSaveTool) {
    window.saveTool = function() {
        console.log('saveTool 被调用，参数:', arguments);
        return originalSaveTool.apply(this, arguments);
    };
    console.log('已重写 saveTool 函数添加调试');
} else {
    console.warn('无法重写 saveTool，函数不存在');
}

// 手动修复可能的问题
function repairSaveFunctionality() {
    console.log('尝试修复保存功能...');
    
    // 1. 重新挂载函数到全局范围
    if (typeof saveTool === 'function' && typeof window.saveTool !== 'function') {
        console.log('将 saveTool 函数挂载到 window 对象');
        window.saveTool = saveTool;
    }
    
    if (typeof showSavedTools === 'function' && typeof window.showSavedTools !== 'function') {
        console.log('将 showSavedTools 函数挂载到 window 对象');
        window.showSavedTools = showSavedTools;
    }
    
    // 2. 重新为按钮添加事件监听器
    console.log('为所有保存按钮重新添加事件监听器');
    document.querySelectorAll('.save-button').forEach(button => {
        // 克隆按钮以移除所有事件监听器
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // 添加新的事件监听器
        newButton.addEventListener('click', function(e) {
            console.log('保存按钮被点击 (通过修复脚本)');
            e.preventDefault();
            e.stopPropagation();
            
            const cardElement = newButton.closest('.card-wrapper') || newButton.closest('.card');
            if (!cardElement) {
                console.error('找不到卡片元素');
                return;
            }
            
            const nameElement = cardElement.querySelector('.card-title') || cardElement.querySelector('h3');
            if (!nameElement) {
                console.error('找不到标题元素');
                return;
            }
            
            const name = nameElement.textContent.trim();
            console.log('将调用 saveTool 函数保存工具:', name);
            
            if (typeof window.saveTool === 'function') {
                window.saveTool(name, '', '', '', []);
            } else if (typeof saveTool === 'function') {
                saveTool(name, '', '', '', []);
            } else {
                console.error('无法找到可用的 saveTool 函数');
            }
        });
    });
    
    // 3. 检查并修复工具栏按钮
    const toolbarButton = document.getElementById('saved-tools-button');
    if (toolbarButton) {
        console.log('为工具栏按钮重新添加事件监听器');
        
        // 克隆按钮以移除所有事件监听器
        const newButton = toolbarButton.cloneNode(true);
        toolbarButton.parentNode.replaceChild(newButton, toolbarButton);
        
        // 添加新的事件监听器
        newButton.addEventListener('click', function() {
            console.log('工具栏按钮被点击 (通过修复脚本)');
            
            if (typeof window.showSavedTools === 'function') {
                window.showSavedTools();
            } else if (typeof showSavedTools === 'function') {
                showSavedTools();
            } else {
                console.error('无法找到可用的 showSavedTools 函数');
                
                // 尝试直接显示模态窗口
                const modal = document.getElementById('savedToolsModal');
                if (modal) {
                    console.log('尝试直接显示模态窗口');
                    modal.style.display = 'block';
                } else {
                    console.error('找不到模态窗口元素');
                }
            }
        });
    }
}

// 自动调用修复函数
setTimeout(repairSaveFunctionality, 2000); 