<template>
  <div class="featured-page">
    <!-- 标题栏：保持上下结构 -->
    <header class="header">
      <h1>精选</h1>
      <div class="icon-text-vertical" @click="showFilter = true">
        <span class="material-icons-round">filter_list</span>
        <span class="label">筛选</span>
      </div>
    </header>

    <!-- 分类轮播 -->
    <div class="category-slider">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-card"
        :class="{ active: currentCategory === category.id }"
        @click="currentCategory = category.id"
      >
        <div class="icon-text">
          <span class="material-icons-round">{{ category.icon }}</span>
          <span class="name">{{ category.name }}</span>
        </div>
        <span class="count">{{ category.count }}个内容</span>
      </div>
    </div>

    <!-- 内容列表 -->
    <div class="content-list">
      <div v-for="item in contentList" :key="item.id" class="content-card">
        <div class="cover">
          <img :src="item.cover" :alt="item.title">
          <span class="duration icon-text">
            <span class="material-icons-round">schedule</span>
            {{ item.duration }}
          </span>
        </div>
        <div class="info">
          <h3 class="title">{{ item.title }}</h3>
          <div class="stats">
            <div class="icon-text">
              <span class="material-icons-round">visibility</span>
              <span>{{ item.views }}</span>
            </div>
            <div class="icon-text">
              <span class="material-icons-round">thumb_up</span>
              <span>{{ item.likes }}</span>
            </div>
          </div>
          <div class="author icon-text">
            <Avatar :defaultIcon="item.authorIcon" size="small" />
            <span class="name">{{ item.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'

const showFilter = ref(false)
const currentCategory = ref(1)

const categories = [
  { id: 1, name: '健康科普', icon: 'health_and_safety', count: 128 },
  { id: 2, name: '营养饮食', icon: 'restaurant', count: 96 },
  { id: 3, name: '运动健身', icon: 'fitness_center', count: 64 },
  { id: 4, name: '心理健康', icon: 'psychology', count: 32 },
  { id: 5, name: '医疗咨询', icon: 'medical_services', count: 48 }
]

const contentList = ref([
  {
    id: 1,
    title: '每天10分钟，告别颈椎病',
    cover: '/images/featured1.jpg',
    duration: '10:30',
    views: '12.8w',
    likes: '2.6w',
    author: '康复师小李',
    authorIcon: 'person'
  },
  {
    id: 2,
    title: '科学饮食指南：三餐搭配的秘密',
    cover: '/images/featured2.jpg',
    duration: '15:45',
    views: '8.6w',
    likes: '1.8w',
    author: '营养师小王',
    authorIcon: 'medical_services'
  }
])
</script>

<style lang="scss" scoped>
.featured-page {
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: var(--font-size-xlarge);
      font-weight: 600;
    }
  }

  .category-slider {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 16px;
    margin-bottom: 20px;
    
    &::-webkit-scrollbar {
      display: none;
    }

    .category-card {
      flex-shrink: 0;
      padding: 12px 16px;
      background: #fff;
      border-radius: 12px;
      transition: all 0.3s ease;
      
      &.active {
        background: $primary-color;
        color: #fff;
        
        .count {
          color: rgba(255, 255, 255, 0.8);
        }
      }

      .icon-text {
        margin-bottom: 4px;
        
        .material-icons-round {
          font-size: var(--font-size-large);
        }
        
        .name {
          font-size: var(--font-size-base);
          font-weight: 500;
        }
      }

      .count {
        font-size: var(--font-size-mini);
        color: $text-secondary;
      }
    }
  }

  .content-list {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    .content-card {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .cover {
        position: relative;
        aspect-ratio: 16/9;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .duration {
          position: absolute;
          right: 8px;
          bottom: 8px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border-radius: 4px;
          font-size: var(--font-size-mini);
        }
      }

      .info {
        padding: 12px;

        .title {
          font-size: var(--font-size-base);
          font-weight: 500;
          margin-bottom: 8px;
          @include text-ellipsis;
        }

        .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
          color: $text-secondary;
          font-size: var(--font-size-small);
        }

        .author {
          color: $text-secondary;
          font-size: var(--font-size-small);
          
          .name {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
