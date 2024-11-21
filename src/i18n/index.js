import { createI18n } from 'vue-i18n'
import zhCN from './langs/zh-CN'
import enUS from './langs/en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 获取浏览器语言设置
const getBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage
  return messages[language] ? language : 'zh-CN'
}

const i18n = createI18n({
  locale: localStorage.getItem('language') || getBrowserLanguage(),
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false // 使用组合式API
})

export default i18n
