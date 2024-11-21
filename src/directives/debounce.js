export default {
  mounted(el, binding) {
    const { value, arg = 300 } = binding
    let timer = null
    
    el.handler = (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        value.apply(this, args)
      }, Number(arg))
    }
    
    el.addEventListener('click', el.handler)
  },
  
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}
