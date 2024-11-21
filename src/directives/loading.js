export default {
  mounted(el, binding) {
    const loadingText = binding.arg || '加载中...'
    
    // 创建加载遮罩
    const mask = document.createElement('div')
    mask.className = 'v-loading-mask'
    mask.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">${loadingText}</p>
      </div>
    `
    
    // 设置样式
    el.style.position = 'relative'
    mask.style.display = binding.value ? 'flex' : 'none'
    
    el.appendChild(mask)
    el.loadingMask = mask
  },
  
  updated(el, binding) {
    if (el.loadingMask) {
      el.loadingMask.style.display = binding.value ? 'flex' : 'none'
    }
  },
  
  unmounted(el) {
    if (el.loadingMask) {
      el.loadingMask.remove()
    }
  }
}
