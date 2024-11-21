<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="header">
        <Avatar 
          :defaultIcon="userInfo.avatar" 
          size="large"
          clickable
        />
        <div class="info">
          <h2 class="name">{{ userInfo.name }}</h2>
          <p class="bio">{{ userInfo.bio }}</p>
        </div>
        <div class="icon-text-vertical" @click="handleEdit">
          <span class="material-icons-round">edit</span>
          <span class="label">编辑</span>
        </div>
      </div>
      
      <div class="stats">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="value">{{ stat.value }}</span>
          <span class="label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section" v-for="section in menuSections" :key="section.title">
      <h3 class="section-title">{{ section.title }}</h3>
      <div class="menu-list">
        <div 
          v-for="item in section.items" 
          :key="item.id"
          class="menu-item icon-text"
          @click="handleMenuClick(item)"
        >
          <div class="left icon-text">
            <span class="material-icons-round" :style="{ color: item.color }">
              {{ item.icon }}
            </span>
            <span class="label">{{ item.label }}</span>
          </div>
          <span class="material-icons-round arrow">chevron_right</span>
        </div>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout-button">
      <Button type="danger" block @click="handleLogout">退出登录</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import Button from '@/components/common/Button.vue'

const userInfo = ref({
  name: '张三',
  avatar: 'person',
  bio: '每天都要保持健康好心情'
})

const stats = [
  { label: '关注', value: '128' },
  { label: '粉丝', value: '256' },
  { label: '获赞', value: '1.2k' }
]

const menuSections = [
  {
    title: '健康管理',
    items: [
      { id: 1, label: '健康档案', icon: 'folder', color: '#4CAF50' },
      { id: 2, label: '运动记录', icon: 'directions_run', color: '#2196F3' },
      { id: 3, label: '饮食计划', icon: 'restaurant', color: '#FF9800' }
    ]
  },
  {
    title: '系统设置',
    items: [
      { id: 4, label: '消息通知', icon: 'notifications', color: '#9C27B0' },
      { id: 5, label: '隐私设置', icon: 'security', color: '#607D8B' },
      { id: 6, label: '关于我们', icon: 'info', color: '#795548' }
    ]
  }
]

const handleEdit = () => {
  // 处理编辑个人信息
}

const handleMenuClick = (item: any) => {
  // 处理菜单点击
}

const handleLogout = () => {
  // 处理退出登录
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 16px;

  .user-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .info {
        flex: 1;
        margin: 0 16px;

        .name {
          font-size: var(--font-size-large);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .bio {
          color: $text-secondary;
          font-size: var(--font-size-small);
        }
      }
    }

    .stats {
      display: flex;
      justify-content: space-around;
      padding-top: 16px;
      border-top: 1px solid $border-light;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .value {
          font-size: var(--font-size-medium);
          font-weight: 600;
          color: $primary-color;
        }

        .label {
          font-size: var(--font-size-small);
          color: $text-secondary;
        }
      }
    }
  }

  .menu-section {
    margin-bottom: 20px;

    .section-title {
      font-size: var(--font-size-base);
      font-weight: 500;
      margin-bottom: 12px;
      padding-left: 8px;
    }

    .menu-list {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;

      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        transition: all 0.3s ease;
        
        &:not(:last-child) {
          border-bottom: 1px solid $border-light;
        }
        
        &:active {
          background: $background-light;
        }

        .left {
          .material-icons-round {
            font-size: var(--font-size-large);
          }
          
          .label {
            font-size: var(--font-size-base);
            margin-left: 12px;
          }
        }

        .arrow {
          color: $text-secondary;
        }
      }
    }
  }

  .logout-button {
    margin-top: 32px;
    padding: 0 16px;
  }
}
</style>
