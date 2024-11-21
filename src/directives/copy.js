export default {
  mounted(el, binding) {
    el.copyHandler = () => {
      const value = binding.value
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      
      try {
        document.execCommand('copy')
        el.dispatchEvent(new CustomEvent('copy-success'))
      } catch (err) {
        el.dispatchEvent(new CustomEvent('copy-error'))
      } finally {
        document.body.removeChild(textarea)
      }
    }
    
    el.addEventListener('click', el.copyHandler)
  },
  
  unmounted(el) {
    el.removeEventListener('click', el.copyHandler)
  }
}
