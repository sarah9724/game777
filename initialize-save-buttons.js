// 初始化所有卡片的保存按钮
document.addEventListener('DOMContentLoaded', function() {
    console.log('初始化保存按钮...');
    addSaveButtonsToCards();
    setupSavedToolsButton();
    setupModalCloseHandlers();
});

// 为所有卡片添加保存按钮
function addSaveButtonsToCards() {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    console.log(`找到 ${cardWrappers.length} 个卡片元素`);
    
    cardWrappers.forEach(wrapper => {
        // 检查是否已有保存按钮
        if (wrapper.querySelector('.save-button')) {
            return; // 已有按钮，跳过
        }
        
        const card = wrapper.querySelector('.card');
        if (!card) return;
        
        // 获取卡片标题和描述
        const titleEl = card.querySelector('.card-title') || card.querySelector('h3');
        if (!titleEl) return;
        
        const title = titleEl.textContent.trim();
        console.log(`添加保存按钮到卡片: ${title}`);
        
        // 创建保存按钮
        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        `;
        
        // 添加点击事件
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 获取卡片信息
            const descEl = card.querySelector('.card-description') || card.querySelector('p');
            const imageEl = card.querySelector('img');
            const linkEl = card.querySelector('a');
            
            const name = title;
            const description = descEl ? descEl.textContent.trim() : '';
            const imageUrl = imageEl ? imageEl.src : '';
            const url = linkEl ? linkEl.href : '';
            
            // 获取标签信息
            const tags = [];
            const tagElements = card.querySelectorAll('.tag') || card.querySelectorAll('.hover-tag');
            tagElements.forEach(tag => tags.push(tag.textContent.trim()));
            
            // 调用外部脚本的保存函数
            window.saveTool(name, description, imageUrl, url, tags);
        });
        
        // 添加到卡片包装器
        wrapper.appendChild(saveButton);
        
        // 检查是否已保存
        updateButtonSavedState(saveButton, title);
    });
}

// 更新按钮的保存状态
function updateButtonSavedState(button, toolName) {
    const savedTools = JSON.parse(localStorage.getItem('savedTools') || '[]');
    const isSaved = savedTools.some(tool => tool.name === toolName);
    
    if (isSaved) {
        button.classList.add('saved');
        const svgPath = button.querySelector('svg path');
        if (svgPath) svgPath.setAttribute('fill', 'white');
    } else {
        button.classList.remove('saved');
        const svgPath = button.querySelector('svg path');
        if (svgPath) svgPath.setAttribute('fill', 'none');
    }
}

// 设置保存工具按钮
function setupSavedToolsButton() {
    // 确保工具栏存在
    let toolbar = document.querySelector('.toolbar');
    if (!toolbar) {
        console.log('创建工具栏');
        toolbar = document.createElement('div');
        toolbar.className = 'toolbar';
        document.body.appendChild(toolbar);
    }
    
    // 检查是否已有保存工具按钮
    let savedToolsButton = document.getElementById('saved-tools-button');
    if (!savedToolsButton) {
        console.log('创建保存工具按钮');
        savedToolsButton = document.createElement('div');
        savedToolsButton.className = 'toolbar-button';
        savedToolsButton.id = 'saved-tools-button';
        savedToolsButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        `;
        toolbar.appendChild(savedToolsButton);
    }
    
    // 移除旧事件，添加新事件
    const newButton = savedToolsButton.cloneNode(true);
    savedToolsButton.parentNode.replaceChild(newButton, savedToolsButton);
    
    newButton.addEventListener('click', function() {
        window.showSavedTools();
    });
}

// 设置模态窗口关闭处理程序
function setupModalCloseHandlers() {
    document.querySelectorAll('.modal').forEach(modal => {
        // 设置关闭按钮
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeButtons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
        
        // 点击外部区域关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}
