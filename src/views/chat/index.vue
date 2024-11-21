<template>
  <div class="chat-page">
    <!-- 头部 -->
    <div class="chat-header">
      <div class="back" @click="router.back()">
        <i class="icon">←</i>
      </div>
      <div class="info">
        <h1>{{ chatInfo.name }}</h1>
        <div class="status">{{ chatInfo.status }}</div>
      </div>
      <div class="more" @click="showMore = true">
        <i class="icon">⋮</i>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="chat-content" ref="messageList">
      <div class="loading" v-if="loading">加载中...</div>
      <template v-else>
        <ChatMessage
          v-for="msg in messages"
          :key="msg.id"
          v-bind="msg"
          :is-self="msg.sender === userInfo.id"
          @image-click="handleImagePreview"
          @audio-play="handleAudioPlay"
          @prescription-detail="handlePrescriptionDetail"
        />
      </template>
    </div>

    <!-- 输入区域 -->
    <ChatInput
      :disabled="inputDisabled"
      @send="handleSend"
      @image="handleImageUpload"
      @voice="handleVoiceUpload"
    />

    <!-- 更多菜单 -->
    <SkDialog
      v-model:visible="showMore"
      title="更多"
      width="300px"
    >
      <div class="more-menu">
        <div class="menu-item" @click="handleClearHistory">
          <i class="icon">🗑️</i>
          <span>清空聊天记录</span>
        </div>
        <div class="menu-item" @click="handleBlock">
          <i class="icon">⛔</i>
          <span>屏蔽该用户</span>
        </div>
        <div class="menu-item" @click="handleReport">
          <i class="icon">⚠️</i>
          <span>举报</span>
        </div>
      </div>
    </SkDialog>

    <!-- 图片预览 -->
    <SkDialog
      v-model:visible="showImagePreview"
      :show-header="false"
      width="90%"
    >
      <div class="image-preview">
        <img :src="previewImage" alt="预览图片">
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

export default defineComponent({
  name: 'ChatPage',
  components: {
    ChatMessage,
    ChatInput
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const messageList = ref(null)
    
    const loading = ref(true)
    const showMore = ref(false)
    const showImagePreview = ref(false)
    const previewImage = ref('')
    const inputDisabled = ref(false)
    
    const chatInfo = ref({})
    const messages = ref([])
    const userInfo = userStore.userInfo

    // 加载聊天信息和历史消息
    const loadChat = async () => {
      try {
        const chatId = route.params.id
        // 实际项目中这里需要调用API获取数据
        chatInfo.value = {
          id: chatId,
          name: '张医生',
          status: '在线',
          avatar: 'https://example.com/avatar.jpg'
        }
        
        messages.value = [
          {
            id: '1',
            type: 'text',
            content: '您好，我是张医生，有什么可以帮您？',
            sender: 'doctor',
            avatar: 'https://example.com/doctor.jpg',
            time: Date.now() - 3600000
          },
          {
            id: '2',
            type: 'text',
            content: '我最近感觉胃不舒服',
            sender: userInfo.id,
            avatar: userInfo.avatar,
            time: Date.now() - 3500000
          }
        ]
        
        loading.value = false
        await nextTick()
        scrollToBottom()
      } catch (error) {
        console.error('加载聊天失败:', error)
      }
    }

    // 滚动到底部
    const scrollToBottom = () => {
      const el = messageList.value
      if (el) {
        el.scrollTop = el.scrollHeight# 创建聊天页面目录
mkdir -p src/views/chat

# 创建聊天详情页面
cat > src/views/chat/index.vue << 'EOF'
<template>
  <div class="chat-page">
    <!-- 头部 -->
    <div class="chat-header">
      <div class="back" @click="router.back()">
        <i class="icon">←</i>
      </div>
      <div class="info">
        <h1>{{ chatInfo.name }}</h1>
        <div class="status">{{ chatInfo.status }}</div>
      </div>
      <div class="more" @click="showMore = true">
        <i class="icon">⋮</i>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="chat-content" ref="messageList">
      <div class="loading" v-if="loading">加载中...</div>
      <template v-else>
        <ChatMessage
          v-for="msg in messages"
          :key="msg.id"
          v-bind="msg"
          :is-self="msg.sender === userInfo.id"
          @image-click="handleImagePreview"
          @audio-play="handleAudioPlay"
          @prescription-detail="handlePrescriptionDetail"
        />
      </template>
    </div>

    <!-- 输入区域 -->
    <ChatInput
      :disabled="inputDisabled"
      @send="handleSend"
      @image="handleImageUpload"
      @voice="handleVoiceUpload"
    />

    <!-- 更多菜单 -->
    <SkDialog
      v-model:visible="showMore"
      title="更多"
      width="300px"
    >
      <div class="more-menu">
        <div class="menu-item" @click="handleClearHistory">
          <i class="icon">🗑️</i>
          <span>清空聊天记录</span>
        </div>
        <div class="menu-item" @click="handleBlock">
          <i class="icon">⛔</i>
          <span>屏蔽该用户</span>
        </div>
        <div class="menu-item" @click="handleReport">
          <i class="icon">⚠️</i>
          <span>举报</span>
        </div>
      </div>
    </SkDialog>

    <!-- 图片预览 -->
    <SkDialog
      v-model:visible="showImagePreview"
      :show-header="false"
      width="90%"
    >
      <div class="image-preview">
        <img :src="previewImage" alt="预览图片">
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

export default defineComponent({
  name: 'ChatPage',
  components: {
    ChatMessage,
    ChatInput
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const messageList = ref(null)
    
    const loading = ref(true)
    const showMore = ref(false)
    const showImagePreview = ref(false)
    const previewImage = ref('')
    const inputDisabled = ref(false)
    
    const chatInfo = ref({})
    const messages = ref([])
    const userInfo = userStore.userInfo

    // 加载聊天信息和历史消息
    const loadChat = async () => {
      try {
        const chatId = route.params.id
        // 实际项目中这里需要调用API获取数据
        chatInfo.value = {
          id: chatId,
          name: '张医生',
          status: '在线',
          avatar: 'https://example.com/avatar.jpg'
        }
        
        messages.value = [
          {
            id: '1',
            type: 'text',
            content: '您好，我是张医生，有什么可以帮您？',
            sender: 'doctor',
            avatar: 'https://example.com/doctor.jpg',
            time: Date.now() - 3600000
          },
          {
            id: '2',
            type: 'text',
            content: '我最近感觉胃不舒服',
            sender: userInfo.id,
            avatar: userInfo.avatar,
            time: Date.now() - 3500000
          }
        ]
        
        loading.value = false
        await nextTick()
        scrollToBottom()
      } catch (error) {
        console.error('加载聊天失败:', error)
      }
    }

    // 滚动到底部
    const scrollToBottom = () => {
      const el = messageList.value
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    }

    // 发送消息
    const handleSend = async (content) => {
      const message = {
        id: Date.now().toString(),
        type: 'text',
        content,
        sender: userInfo.id,
        avatar: userInfo.avatar,
        time: Date.now()
      }
      
      messages.value.push(message)
      await nextTick()
      scrollToBottom()
      
      // 实际项目中这里需要调用API发送消息
    }

    // 处理图片上传
    const handleImageUpload = async (file) => {
      try {
        // 实际项目中这里需要调用API上传图片
        const imageUrl = URL.createObjectURL(file)
        
        const message = {
          id: Date.now().toString(),
          type: 'image',
          content: imageUrl,
          sender: userInfo.id,
          avatar: userInfo.avatar,
          time: Date.now()
        }
        
        messages.value.push(message)
        await nextTick()
        scrollToBottom()
      } catch (error) {
        console.error('上传图片失败:', error)
      }
    }

    // 处理语音上传
    const handleVoiceUpload = async (data) => {
      try {
        // 实际项目中这里需要调用API上传语音文件
        const message = {
          id: Date.now().toString(),
          type: 'audio',
          content: 'audio_url',
          duration: data.duration,
          sender: userInfo.id,
          avatar: userInfo.avatar,
          time: Date.now()
        }
        
        messages.value.push(message)
        await nextTick()
        scrollToBottom()
      } catch (error) {
        console.error('上传语音失败:', error)
      }
    }

    // 图片预览
    const handleImagePreview = (url) => {
      previewImage.value = url
      showImagePreview.value = true
    }

    // 播放语音
    const handleAudioPlay = (audio) => {
      // 实际项目中这里需要实现音频播放逻辑
      console.log('播放语音:', audio)
    }

    // 查看处方详情
    const handlePrescriptionDetail = (prescription) => {
      router.push({
        name: 'Prescription',
        params: { id: prescription.id }
      })
    }

    // 清空聊天记录
    const handleClearHistory = () => {
      // 实际项目中这里需要调用API
      messages.value = []
      showMore.value = false
    }

    // 屏蔽用户
    const handleBlock = () => {
      // 实际项目中这里需要调用API
      showMore.value = false
    }

    // 举报
    const handleReport = () => {
      // 实际项目中这里需要调用API
      showMore.value = false
    }

    onMounted(() => {
      loadChat()
    })

    return {
      router,
      messageList,
      loading,
      showMore,
      showImagePreview,
      previewImage,
      inputDisabled,
      chatInfo,
      messages,
      userInfo,
      handleSend,
      handleImageUpload,
      handleVoiceUpload,
      handleImagePreview,
      handleAudioPlay,
      handlePrescriptionDetail,
      handleClearHistory,
      handleBlock,
      handleReport
    }
  }
})
</script>

<style scoped lang="scss">
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-bottom: 1px solid #eee;
  
  .back {
    padding: 8px;
    cursor: pointer;
    
    .icon {
      font-size: 20px;
    }
  }
  
  .info {
    flex: 1;
    padding: 0 15px;
    
    h1 {
      font-size: 16px;
      margin: 0;
    }
    
    .status {
      font-size: 12px;
      color: #999;
    }
  }
  
  .more {
    padding: 8px;
    cursor: pointer;
    
    .icon {
      font-size: 20px;
    }
  }
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 15px 0;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #999;
}

.more-menu {
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    cursor: pointer;
    
    &:hover {
      background: #f5f5f5;
    }
    
    .icon {
      font-size: 20px;
    }
  }
}

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    max-height: 80vh;
  }
}
</style>
