<template>
  <div class="chat-list">
    <div 
      v-for="chat in sortedChats" 
      :key="chat.id"
      class="chat-item"
      :class="{ 'pinned': chat.isPinned }"
    >
      <Avatar 
        :defaultIcon="chat.icon"
        :status="chat.status"
        show-status
        clickable
      />
      <div class="content">
        <div class="header">
          <span class="name">{{ chat.name }}</span>
          <time :datetime="chat.timestamp" class="time">
            {{ formatTime(chat.timestamp) }}
          </time>
        </div>
        <div class="message icon-text-vertical">
          <span class="material-icons-round">{{ chat.messageIcon }}</span>
          <span class="text">{{ chat.lastMessage }}</span>
        </div>
      </div>
      <div class="actions icon-text-vertical" v-if="chat.isPinned">
        <span class="material-icons-round">push_pin</span>
        <span class="label">置顶</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import { formatTime } from '@/utils/time'

const chats = ref([
  {
    id: 1,
    name: 'AI 助理',
    icon: 'smart_toy',
    status: 'online',
    messageIcon: 'psychology',
    lastMessage: '您好，我是您的智能健康助理',
    timestamp: Date.now() - 1000 * 60 * 5,
    isPinned: true
  },
  {
    id: 2,
    name: '张医生',
    icon: 'medical_services',
    status: 'offline',
    messageIcon: 'medication',
    lastMessage: '请记得按时服用药物',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    isPinned: false
  },
  // 添加更多会话...
])

// 根据置顶状态和时间戳排序
const sortedChats = computed(() => {
  return [...chats.value].sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1
    }
    return b.timestamp - a.timestamp
  })
})
</script>

<style lang="scss" scoped>
.chat-list {
  .chat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.3s ease;
    
    &.pinned {
      background: linear-gradient(to right, #fff, #f8f9fa);
      border-left: 4px solid $primary-color;
    }
    
    &:active {
      transform: scale(0.98);
    }

    .content {
      flex: 1;
      min-width: 0;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .name {
          font-weight: 500;
          font-size: var(--font-size-base);
        }

        .time {
          color: $text-secondary;
          font-size: var(--font-size-mini);
        }
      }

      .message {
        color: $text-secondary;
        
        .text {
          @include text-ellipsis;
          font-size: var(--font-size-small);
        }
      }
    }

    .actions {
      color: $primary-color;
      padding: 4px;
      
      .material-icons-round {
        font-size: var(--font-size-large);
      }
      
      .label {
        font-size: var(--font-size-mini);
      }
    }
  }
}
</style>
