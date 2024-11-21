import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, login, loginByCode, logout } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  // 设置 token
  const setToken = async (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 清除 token
  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo()
      userInfo.value = data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 密码登录
  const loginByPassword = async (data) => {
    try {
      const res = await login(data)
      await setToken(res.token)
      await fetchUserInfo()
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 验证码登录
  const loginBySmsCode = async (data) => {
    try {
      const res = await loginByCode(data)
      await setToken(res.token)
      await fetchUserInfo()
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 退出登录
  const logoutAction = async () => {
    try {
      await logout()
      clearToken()
      userInfo.value = null
    } catch (error) {
      console.error('退出登录失败:', error)
      throw error
    }
  }

  return {
    token,
    userInfo,
    setToken,
    clearToken,
    fetchUserInfo,
    loginByPassword,
    loginBySmsCode,
    logoutAction
  }
})
