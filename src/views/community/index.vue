<template>
  <div class="community-page">
    <!-- 热门活动 -->
    <section class="community-section">
      <h2 class="section-title">
        <span class="material-icons-round">local_fire_department</span>
        热门活动
      </h2>
      <div class="activity-card">
        <span class="material-icons-round">event</span>
        <h3>年度健康普查</h3>
        <p>限时特惠 · 1280人已参与</p>
        <div class="tag-list">
          <span class="tag">心脑</span>
          <span class="tag">甲状腺</span>
          <span class="tag">更多</span>
        </div>
      </div>
    </section>

    <!-- 健康话题 -->
    <section class="community-section">
      <h2 class="section-title">
        <span class="material-icons-round">forum</span>
        健康话题
      </h2>
      <div class="topic-list">
        <div class="topic-card" v-for="topic in topics" :key="topic.id">
          <div class="topic-header">
            <Avatar :src="topic.avatar" size="small" />
            <span class="name">{{ topic.name }}</span>
            <span class="time">{{ topic.time }}</span>
          </div>
          <div class="topic-content">
            <p>{{ topic.content }}</p>
            <div class="topic-images" v-if="topic.images?.length">
              <img v-for="img in topic.images" :key="img" :src="img" />
            </div>
          </div>
          <div class="topic-footer">
            <div class="action">
              <span class="material-icons-round">thumb_up</span>
              <span>{{ topic.likes }}</span>
            </div>
            <div class="action">
              <span class="material-icons-round">chat_bubble</span>
              <span>{{ topic.comments }}</span>
            </div>
            <div class="action">
              <span class="material-icons-round">share</span>
              <span>分享</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'

const topics = ref([
  {
    id: 1,
    name: '营养师小王',
    avatar: '/images/nutritionist-avatar.png',
    time: '10分钟前',
    content: '秋季养生小贴士：1. 早睡早起 2. 适量运动 3. 注意保暖',
    likes: 128,
    comments: 32
  },
  {
    id: 2,
    name: '运动达人',
    avatar: '/images/fitness-avatar.png',
    time: '30分钟前',
    content: '分享一组简单的居家运动，每天10分钟，强健体魄！',
    images: ['/images/fitness-1.jpg', '/images/fitness-2.jpg'],
    likes: 256,
    comments: 64
  }
])
</script>

<style lang="scss" scoped>
.community-page {
  padding: 16px;
  animation: fade-in 0.3s ease-out;

  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    
    .material-icons-round {
      color: $primary-color;
    }
  }

  .activity-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    transition: transform 0.2s;
    
    &:active {
      transform: scale(0.98);
    }
    
    .material-icons-round {
      font-size: 32px;
      color: $primary-color;
      margin-bottom: 8px;
    }
  }

  .topic-list {
    .topic-card {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      
      .topic-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        
        .name {
          font-weight: 500;
        }
        
        .time {
          color: $text-secondary;
          font-size: $font-size-small;
          margin-left: auto;
        }
      }
      
      .topic-content {
        margin-bottom: 12px;
        
        .topic-images {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 8px;
          
          img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 8px;
          }
        }
      }
      
      .topic-footer {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid $border-lighter;
        padding-top: 12px;
        
        .action {
          display: flex;
          align-items: center;
          gap: 4px;
          color: $text-secondary;
          
          .material-icons-round {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
