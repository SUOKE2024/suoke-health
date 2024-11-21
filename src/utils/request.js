import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const appStore = useAppStore()
    
    // 设置加载状态
    appStore.setLoading(true)
    
    // 添加token
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    
    const res = response.data
    if (res.code !== 0) {
      // 处理业务错误
      console.error('API error:', res.message)
      return Promise.reject(new Error(res.message))
    }
    return res.data
  },
  error => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export default service
