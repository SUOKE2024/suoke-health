import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/global.scss'

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(router)
app.use(createPinia())

// 注册全局组件
import {
  Button,
  Toast,
  Loading
} from './components/common'

app.component('SkButton', Button)
app.component('SkToast', Toast)
app.component('SkLoading', Loading)

// 挂载应用
app.mount('#app')
