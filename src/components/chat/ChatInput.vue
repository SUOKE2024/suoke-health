<template>
  <div class="chat-input">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div 
        v-for="tool in tools" 
        :key="tool.type"
        class="tool-item"
        @click="handleToolClick(tool)"
      >
        <i class="icon">{{ tool.icon }}</i>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <textarea
        ref="textarea"
        v-model="message"
        :placeholder="placeholder"
        :disabled="disabled"
        @keydown.enter.prevent="handleSend"
      ></textarea>
      <button 
        class="send-btn"
        :disabled="!message.trim() || disabled"
        @click="handleSend"
      >
        发送# 创建聊天组件目录
mkdir -p src/components/chat

# 现在创建聊天输入组件
cat > src/components/chat/ChatInput.vue << 'EOF'
<template>
  <div class="chat-input">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div 
        v-for="tool in tools" 
        :key="tool.type"
        class="tool-item"
        @click="handleToolClick(tool)"
      >
        <i class="icon">{{ tool.icon }}</i>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <textarea
        ref="textarea"
        v-model="message"
        :placeholder="placeholder"
        :disabled="disabled"
        @keydown.enter.prevent="handleSend"
      ></textarea>
      <button 
        class="send-btn"
        :disabled="!message.trim() || disabled"
        @click="handleSend"
      >
        发送
      </button>
    </div>

    <!-- 语音录制弹窗 -->
    <SkDialog
      v-model:visible="showVoiceRecorder"
      title="语音消息"
      width="300px"
    >
      <div class="voice-recorder">
        <div class="status">{{ recording ? '录音中...' : '准备就绪' }}</div>
        <div class="time" v-if="recording">{{ recordingTime }}s</div>
        <button 
          class="record-btn"
          :class="{ recording }"
          @touchstart="startRecording"
          @touchend="stopRecording"
        >
          按住说话
        </button>
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ChatInput',
  props: {
    placeholder: {
      type: String,
      default: '输入消息...'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['send', 'image', 'voice'],
  setup(props, { emit }) {
    const message = ref('')
    const showVoiceRecorder = ref(false)
    const recording = ref(false)
    const recordingTime = ref(0)
    let recordTimer = null

    const tools = [
      { type: 'image', icon: '🖼️' },
      { type: 'voice', icon: '🎤' }
    ]

    const handleToolClick = (tool) => {
      switch (tool.type) {
        case 'image':
          // 触发文件选择
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = (e) => {
            const file = e.target.files[0]
            if (file) {
              emit('image', file)
            }
          }
          input.click()
          break
        case 'voice':
          showVoiceRecorder.value = true
          break
      }
    }

    const handleSend = () => {
      if (!message.value.trim() || props.disabled) return
      emit('send', message.value)
      message.value = ''
    }

    const startRecording = () => {
      recording.value = true
      recordingTime.value = 0
      recordTimer = setInterval(() => {
        recordingTime.value++
        if (recordingTime.value >= 60) {
          stopRecording()
        }
      }, 1000)
      // 实际项目中这里需要调用录音 API
    }

    const stopRecording = () => {
      if (!recording.value) return
      recording.value = false
      clearInterval(recordTimer)
      // 实际项目中这里需要停止录音并获取录音文件
      emit('voice', {
        duration: recordingTime.value,
        file: null // 录音文件
      })
      showVoiceRecorder.value = false
    }

    return {
      message,
      tools,
      showVoiceRecorder,
      recording,
      recordingTime,
      handleToolClick,
      handleSend,
      startRecording,
      stopRecording
    }
  }
})
</script>

<style scoped lang="scss">
.chat-input {
  background: white;
  border-top: 1px solid #eee;
  padding: 10px;
}

.toolbar {
  display: flex;
  gap: 15px;
  padding: 5px 0;
}

.tool-item {
  cursor: pointer;
  
  .icon {
    font-size: 20px;
  }
}

.input-area {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  
  textarea {
    flex: 1;
    height: 36px;
    max-height: 120px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    
    &:focus {
      border-color: $primary-color;
    }
  }
}

.send-btn {
  padding: 8px 16px;
  background: $primary-color;
  color: white;
  border-radius: 4px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.voice-recorder {
  text-align: center;
  padding: 20px;
  
  .status {
    margin-bottom: 10px;
  }
  
  .time {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .record-btn {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #f5f5f5;
    
    &.recording {
      background: $primary-color;
      color: white;
    }
  }
}
</style>
