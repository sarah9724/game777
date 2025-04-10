// AI Navigation Hub - Improved Save Functions

// Array to store saved tools
let savedTools = JSON.parse(localStorage.getItem('savedTools')) || [];

// Function to save a tool
function saveTool(name, description, imageUrl, url, tags) {
  // Check if tool is already saved
  const existingIndex = savedTools.findIndex(tool => tool.name === name);
  
  if (existingIndex !== -1) {
    // Remove if already saved (toggle functionality)
    savedTools.splice(existingIndex, 1);
    updateSaveButtonStates();
    showToast(`${name} 已从收藏中移除`);
    localStorage.setItem('savedTools', JSON.stringify(savedTools));
    return false; // Return false to indicate removal
  } else {
    // Add to saved tools
    const tool = {
      name,
      description,
      imageUrl,
      url,
      tags,
      savedAt: new Date().toISOString()
    };
    
    savedTools.push(tool);
    updateSaveButtonStates();
    showToast(`${name} 已添加到收藏`);
    localStorage.setItem('savedTools', JSON.stringify(savedTools));
    return true; // Return true to indicate addition
  }
}

// Function to display saved tools modal
function showSavedTools() {
  // Get or create modal container
  let modalContainer = document.getElementById('savedToolsModal');
  
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'savedToolsModal';
    modalContainer.className = 'modal';
    document.body.appendChild(modalContainer);
  }
  
  // Build modal content
  let modalContent = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>已收藏工具</h2>
        <span class="close-modal">&times;</span>
      </div>
      <div class="modal-body">
  `;
  
  if (savedTools.length === 0) {
    modalContent += `<p class="empty-message">您还没有收藏任何工具。</p>`;
  } else {
    modalContent += `<div class="saved-tools-grid">`;
    
    savedTools.forEach(tool => {
      modalContent += `
        <div class="saved-tool-card">
          <div class="saved-tool-image">
            <img src="${tool.imageUrl || 'placeholder.png'}" alt="${tool.name}">
          </div>
          <div class="saved-tool-content">
            <h3>${tool.name}</h3>
            <p>${tool.description || ''}</p>
            <div class="saved-tool-tags">
              ${tool.tags ? tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
            <div class="saved-tool-actions">
              <a href="${tool.url}" target="_blank" class="visit-button">访问网站</a>
              <button class="remove-button" onclick="removeSavedTool('${tool.name}')">移除收藏</button>
            </div>
          </div>
        </div>
      `;
    });
    
    modalContent += `</div>`;
  }
  
  modalContent += `
      </div>
    </div>
  `;
  
  modalContainer.innerHTML = modalContent;
  modalContainer.style.display = 'block';
  
  // Add event listener to close button
  const closeButton = modalContainer.querySelector('.close-modal');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modalContainer.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      modalContainer.style.display = 'none';
    }
  });
}

// Function to remove a saved tool
function removeSavedTool(name) {
  const index = savedTools.findIndex(tool => tool.name === name);
  
  if (index !== -1) {
    savedTools.splice(index, 1);
    localStorage.setItem('savedTools', JSON.stringify(savedTools));
    updateSaveButtonStates();
    showToast(`${name} 已从收藏中移除`);
    showSavedTools(); // Refresh the modal
  }
}

// Update all save button states based on saved tools
function updateSaveButtonStates() {
  const saveButtons = document.querySelectorAll('.save-button');
  
  saveButtons.forEach(button => {
    const cardElement = button.closest('.card-wrapper') || button.closest('.card');
    if (!cardElement) return;
    
    const nameElement = cardElement.querySelector('.card-title') || cardElement.querySelector('h3');
    if (!nameElement) return;
    
    const toolName = nameElement.textContent.trim();
    const isSaved = savedTools.some(tool => tool.name === toolName);
    
    // Update button appearance
    if (isSaved) {
      button.classList.add('saved');
      button.setAttribute('title', '从收藏中移除');
    } else {
      button.classList.remove('saved');
      button.setAttribute('title', '添加到收藏');
    }
  });
}

// Function to show toast notification
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.className = 'toast show';
  
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, duration);
}

// Initialize save buttons on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved state to buttons
  updateSaveButtonStates();
  
  // Add event listeners to save buttons
  document.querySelectorAll('.save-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const cardElement = button.closest('.card-wrapper') || button.closest('.card');
      if (!cardElement) return;
      
      const nameElement = cardElement.querySelector('.card-title') || cardElement.querySelector('h3');
      const descElement = cardElement.querySelector('.card-description') || cardElement.querySelector('p');
      const imageElement = cardElement.querySelector('img');
      const linkElement = cardElement.querySelector('a');
      
      if (!nameElement) return;
      
      const name = nameElement.textContent.trim();
      const description = descElement ? descElement.textContent.trim() : '';
      const imageUrl = imageElement ? imageElement.src : '';
      const url = linkElement ? linkElement.href : '';
      
      // Get tags if available
      const tags = [];
      const tagElements = cardElement.querySelectorAll('.tag');
      tagElements.forEach(tag => tags.push(tag.textContent.trim()));
      
      // Toggle save state
      saveTool(name, description, imageUrl, url, tags);
    });
  });
  
  // Add event listener to saved tools button if it exists
  const savedToolsButton = document.getElementById('show-saved-tools');
  if (savedToolsButton) {
    savedToolsButton.addEventListener('click', showSavedTools);
  }
});

// Export functions for use in HTML
window.saveTool = saveTool;
window.showSavedTools = showSavedTools;
window.removeSavedTool = removeSavedTool;
window.updateSaveButtonStates = updateSaveButtonStates;
window.showToast = showToast; 