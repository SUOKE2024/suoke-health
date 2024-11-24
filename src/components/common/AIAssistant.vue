<template>
  <div class="ai-assistant">
    <div class="header">
      <h1>{{ i18n[currentLanguage].title }}</h1>
    </div>
    <div class="container" ref="chatContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 主题配置
const themes = {
  light: {
    primaryColor: '#4F46E5',
    backgroundColor: '#ffffff',
    textColor: '#2d3748'
  },
  dark: {
    primaryColor: '#6366F1',
    backgroundColor: '#2d2d2d',
    textColor: '#e0e0e0'
  }
}

// 语言配置
const i18n = {
  zh: {
    title: 'AI助手',
    sendPlaceholder: '请输入您的问题...',
    welcome: '你好！我是AI助手，很高兴为您服务。有什么我可以帮您的吗？'
  },
  en: {
    title: 'AI Assistant',
    sendPlaceholder: 'Type your message...',
    welcome: 'Hello! I\'m your AI assistant. How can I help you today?'
  }
}

const chatContainer = ref(null)
const currentLanguage = ref(navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en')
let chatClient = null

// 初始化聊天
function initChat(theme) {
  if (chatContainer.value) {
    chatContainer.value.innerHTML = ''
  }

  chatClient = new window.CozeWebSDK.WebChatClient({
    config: {
      bot_id: '7429205852169142307',
      container: chatContainer.value
    },
    componentProps: {
      title: i18n[currentLanguage.value].title,
      placeholder: i18n[currentLanguage.value].sendPlaceholder,
      welcome: i18n[currentLanguage.value].welcome,
      theme: {
        ...themes[theme],
        fontSize: '16px'
      }
    }
  })
}

onMounted(() => {
  // 加载 SDK
  const script = document.createElement('script')
  script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.3/libs/cn/index.js'
  script.onload = () => {
    // SDK 加载完成后初始化
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    initChat(prefersDark.matches ? 'dark' : 'light')

    // 监听系统主题变化
    prefersDark.addEventListener('change', (e) => {
      initChat(e.matches ? 'dark' : 'light')
    })
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  if (chatClient) {
    chatClient = null
  }
})
</script>

<style scoped>
.ai-assistant {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-color);
}

.header {
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header h1 {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.container {
  flex-grow: 1;
  background: var(--container-bg);
  border-radius: 16px;
  box-shadow: 0 4px 20px var(--shadow-color);
  overflow: hidden;
  position: relative;
  margin: 0 10px 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.2rem;
  }

  .container {
    margin: 0;
    border-radius: 0;
  }
}

@media (max-height: 600px) {
  .header {
    padding: 5px 15px;
  }

  .header h1 {
    font-size: 1rem;
  }
}

@media (orientation: landscape) and (max-height: 450px) {
  .header {
    display: none;
  }

  .container {
    height: 100vh;
    border-radius: 0;
    margin: 0;
  }
}
</style>
