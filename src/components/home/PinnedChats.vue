<template>
  <div class="pinned-chats">
    <div class="chat-item" v-for="chat in pinnedChats" :key="chat.id">
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
        <div class="message icon-text">
          <span class="material-icons-round">{{ chat.messageIcon }}</span>
          {{ chat.lastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import { formatTime } from '@/utils/time'

const pinnedChats = ref([
  {
    id: 1,
    name: 'AI 助理',
    icon: 'smart_toy',
    status: 'online',
    messageIcon: 'psychology',
    lastMessage: '您好，我是您的智能健康助理',
    timestamp: Date.now() - 1000 * 60 * 5 // 5分钟前
  },
  {
    id: 2,
    name: '张医生',
    icon: 'medical_services',
    status: 'offline',
    messageIcon: 'medication',
    lastMessage: '请记得按时服用药物',
    timestamp: Date.now() - 1000 * 60 * 60 * 2 // 2小时前
  }
])
</script>

<style lang="scss" scoped>
.pinned-chats {
  margin-bottom: 20px;

  .chat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.3s ease;
    
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
        margin-bottom: 4px;

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
        font-size: var(--font-size-small);
        @include text-ellipsis;
        display: flex;
        align-items: center;
        gap: 4px;

        .message-icon {
          font-size: var(--font-size-base);
          color: $primary-color;
        }
      }
    }
  }
}
</style>
