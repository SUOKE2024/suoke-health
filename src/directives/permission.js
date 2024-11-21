export default {
  mounted(el, binding) {
    const { value } = binding
    const userPermissions = localStorage.getItem('permissions') // 实际项目中从状态管理获取
    
    if (value && (!userPermissions || !userPermissions.includes(value))) {
      el.parentNode?.removeChild(el)
    }
  }
}
