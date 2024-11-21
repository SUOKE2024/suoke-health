<template>
  <div class="recent-chats">
    <div class="section-title">最近会话</div>
    <div class="chat-item" v-for="chat in recentChats" :key="chat.id">
      <div class="avatar">
        <img :src="chat.avatar" :alt="chat.name">
        <span class="status" :class="chat.status"></span>
      </div>
      <div class="content">
        <div class="header">
          <span class="name">{{ chat.name }}</span>
          <span class="time">{{ chat.time }}</span>
        </div>
        <div class="subtitle">{{ chat.subtitle }}</div>
        <div class="message">{{ chat.lastMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const recentChats = ref([
  {
    id: 1,
    name: '营养助手',
    avatar: '/images/nutrition-avatar.png',
    status: 'online',
    subtitle: 'AI助手  •  在线',
    lastMessage: '您的饮食建议已生成...',
    time: '昨天'
  },
  {
    id: 2,
    name: '运动助手',
    avatar: '/images/fitness-avatar.png',
    status: 'online',
    subtitle: 'AI助手  •  在线',
    lastMessage: '今日运动计划已更新...',
    time: '昨天'
  },
  {
    id: 3,
    name: '张医生',
    avatar: '/images/doctor-avatar.png',
    status: 'offline',
    subtitle: '专家  •  离线',
    lastMessage: '好的，继续保持...',
    time: '周一'
  }
])
</script>

<style lang="scss" scoped>
.recent-chats {
  margin-top: 24px;

  .section-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .chat-item {
    display: flex;
    padding: 12px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }

    // 样式与 PinnedChats 组件相同...
  }
}
</style>
