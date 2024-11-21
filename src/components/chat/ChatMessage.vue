<template>
  <div class="message" :class="{ 'is-self': isSelf }">
    <div class="avatar">
      <img :src="avatar" :alt="sender">
    </div>
    <div class="content">
      <div class="sender" v-if="showSender">{{ sender }}</div>
      <div class="bubble" :class="type">
        <!-- 文本消息 -->
        <template v-if="type === 'text'">
          {{ content }}
        </template>
        
        <!-- 图片消息 -->
        <template v-else-if="type === 'image'">
          <img 
            :src="content" 
            @click="handleImageClick"
            v-lazy="content"
          >
        </template>
        
        <!-- 语音消息 -->
        <template v-else-if="type === 'audio'">
          <div class="audio-message" @click="handleAudioPlay">
            <i class="icon">🔊</i>
            <span>{{ duration }}″</span>
          </div>
        </template>

        <!-- 处方消息 -->
        <template v-else-if="type === 'prescription'">
          <div class="prescription">
            <div class="prescription-header">
              <i class="icon">💊</i>
              <span>电子处方</span>
            </div>
            <div class="prescription-content">
              {{ content.diagnosis }}
            </div>
            <div class="prescription-footer">
              <button @click="handlePrescriptionDetail">查看详情</button>
            </div>
          </div>
        </template>
      </div>
      <div class="time">{{ formatTime(time) }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { formatTime } from '@/utils/time'

export default defineComponent({
  name: 'ChatMessage',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    content: {
      type: [String, Object],
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    isSelf: {
      type: Boolean,
      default: false
    },
    showSender: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  emits: ['image-click', 'audio-play', 'prescription-detail'],
  setup(props, { emit }) {
    const handleImageClick = () => {
      emit('image-click', props.content)
    }

    const handleAudioPlay = () => {
      emit('audio-play', {
        id: props.id,
        url: props.content
      })
    }

    const handlePrescriptionDetail = () => {
      emit('prescription-detail', props.content)
    }

    return {
      handleImageClick,
      handleAudioPlay,
      handlePrescriptionDetail,
      formatTime
    }
  }
})
</script>

<style scoped lang="scss">
.message {
  display: flex;
  margin-bottom: 20px;
  padding: 0 15px;

  &.is-self {
    flex-direction: row-reverse;

    .bubble {
      background: $primary-color;
      color: white;
      margin-left: 0;
      margin-right: 12px;

      &::before {
        left: auto;
        right: -6px;
        border-left-color: $primary-color;
        border-right-color: transparent;
      }
    }

    .time {
      text-align: right;
    }
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.content {
  flex: 1;
  max-width: 70%;
}

.sender {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.bubble {
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  position: relative;
  margin-left: 12px;
  word-break: break-all;

  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: -6px;
    border: 6px solid transparent;
    border-right-color: white;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
    cursor: pointer;
  }
}

.audio-message {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  .icon {
    font-size: 20px;
  }
}

.prescription {
  min-width: 200px;

  .prescription-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }

  .prescription-content {
    margin-bottom: 8px;
  }

  .prescription-footer {
    text-align: right;

    button {
      padding: 4px 8px;
      border: 1px solid currentColor;
      border-radius: 4px;
      font-size: 12px;
    }
  }
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
