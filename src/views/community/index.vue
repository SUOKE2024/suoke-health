<template>
  <div class="community-page">
    <!-- 标题栏：保持上下结构 -->
    <header class="header">
      <div class="search-bar icon-text-vertical">
        <span class="material-icons-round">search</span>
        <span class="label">搜索话题</span>
      </div>
      <div class="icon-text-vertical" @click="showPublish = true">
        <span class="material-icons-round">edit</span>
        <span class="label">发布</span>
      </div>
    </header>

    <!-- 分类标签：左右结构 -->
    <div class="categories">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-item icon-text"
        :class="{ active: currentCategory === category.id }"
        @click="currentCategory = category.id"
      >
        <span class="material-icons-round">{{ category.icon }}</span>
        <span class="label">{{ category.name }}</span>
      </div>
    </div>

    <!-- 帖子列表 -->
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-header">
          <div class="user-info">
            <Avatar :defaultIcon="post.userIcon" size="small" />
            <div class="info">
              <div class="name">{{ post.userName }}</div>
              <div class="time">{{ formatTime(post.timestamp) }}</div>
            </div>
          </div>
          <div class="icon-text">
            <span class="material-icons-round">more_horiz</span>
          </div>
        </div>
        
        <div class="post-content">
          <p class="text">{{ post.content }}</p>
          <div class="images" v-if="post.images?.length">
            <img 
              v-for="(img, index) in post.images" 
              :key="index" 
              :src="img" 
              @click="previewImage(post.images, index)"
            >
          </div>
        </div>

        <div class="post-footer">
          <div class="action icon-text">
            <span class="material-icons-round">thumb_up</span>
            <span class="count">{{ post.likes }}</span>
          </div>
          <div class="action icon-text">
            <span class="material-icons-round">chat_bubble</span>
            <span class="count">{{ post.comments }}</span>
          </div>
          <div class="action icon-text">
            <span class="material-icons-round">share</span>
            <span class="count">{{ post.shares }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import { formatTime } from '@/utils/time'

const showPublish = ref(false)
const currentCategory = ref(1)

const categories = [
  { id: 1, name: '推荐', icon: 'recommend' },
  { id: 2, name: '健康', icon: 'favorite' },
  { id: 3, name: '饮食', icon: 'restaurant' },
  { id: 4, name: '运动', icon: 'directions_run' },
  { id: 5, name: '心理', icon: 'psychology' }
]

const posts = ref([
  {
    id: 1,
    userName: '健康达人',
    userIcon: 'person',
    content: '每天坚持运动的第30天，感觉整个人都不一样了！',
    images: ['/images/post1.jpg'],
    timestamp: Date.now() - 1000 * 60 * 30,
    likes: 128,
    comments: 32,
    shares: 16
  },
  {
    id: 2,
    userName: '营养师小王',
    userIcon: 'medical_services',
    content: '分享一个健康又美味的早餐食谱...',
    timestamp: Date.now() - 1000 * 60 * 60,
    likes: 256,
    comments: 64,
    shares: 32
  }
])

const previewImage = (images: string[], index: number) => {
  // 实现图片预览功能
}
</script>

<style lang="scss" scoped>
.community-page {
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .search-bar {
      flex: 1;
      margin-right: 16px;
      padding: 8px;
      background: #fff;
      border-radius: 8px;
      color: $text-secondary;
    }
  }

  .categories {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 8px;
    
    &::-webkit-scrollbar {
      display: none;
    }

    .category-item {
      padding: 8px 16px;
      background: #fff;
      border-radius: 20px;
      white-space: nowrap;
      transition: all 0.3s ease;
      
      &.active {
        background: $primary-color;
        color: #fff;
      }
      
      .material-icons-round {
        font-size: var(--font-size-base);
      }
      
      .label {
        font-size: var(--font-size-small);
      }
    }
  }

  .post-list {
    .post-item {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;

          .info {
            .name {
              font-weight: 500;
              font-size: var(--font-size-base);
            }

            .time {
              color: $text-secondary;
              font-size: var(--font-size-mini);
            }
          }
        }
      }

      .post-content {
        margin-bottom: 12px;

        .text {
          margin-bottom: 8px;
          font-size: var(--font-size-base);
          line-height: 1.5;
        }

        .images {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          
          img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 4px;
          }
        }
      }

      .post-footer {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid $border-light;
        padding-top: 12px;

        .action {
          color: $text-secondary;
          
          .material-icons-round {
            font-size: var(--font-size-base);
          }
          
          .count {
            font-size: var(--font-size-small);
          }
        }
      }
    }
  }
}
</style>
