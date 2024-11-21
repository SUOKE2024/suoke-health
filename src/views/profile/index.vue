<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <section class="profile-header">
      <div class="user-info">
        <Avatar src="/images/user-avatar.png" size="large" />
        <div class="info">
          <h2>张三</h2>
          <p>会员等级：黄金会员</p>
        </div>
      </div>
      <span class="material-icons-round" @click="handleSettings">settings</span>
    </section>

    <!-- 健康数据 -->
    <section class="profile-section">
      <h2 class="section-title">
        <span class="material-icons-round">monitoring</span>
        健康数据
      </h2>
      <div class="data-grid">
        <div class="data-card">
          <span class="material-icons-round">directions_walk</span>
          <h3>步数</h3>
          <p>8,546</p>
          <a class="link">今日数据 <span class="material-icons-round">chevron_right</span></a>
        </div>
        <div class="data-card">
          <span class="material-icons-round">bedtime</span>
          <h3>睡眠</h3>
          <p>7.5h</p>
          <a class="link">查看报告 <span class="material-icons-round">chevron_right</span></a>
        </div>
        <div class="data-card">
          <span class="material-icons-round">favorite</span>
          <h3>心率</h3>
          <p>正常</p>
          <a class="link">趋势分析 <span class="material-icons-round">chevron_right</span></a>
        </div>
      </div>
    </section>

    <!-- 我的服务 -->
    <section class="profile-section">
      <h2 class="section-title">
        <span class="material-icons-round">grid_view</span>
        我的服务
      </h2>
      <div class="service-grid">
        <div class="service-item" v-for="item in services" :key="item.name">
          <span class="material-icons-round">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- 会员权益 -->
    <section class="profile-section">
      <h2 class="section-title">
        <span class="material-icons-round">card_membership</span>
        会员权益
      </h2>
      <div class="vip-card">
        <ul class="vip-list">
          <li><span class="material-icons-round">check_circle</span> AI 专属服务</li>
          <li><span class="material-icons-round">check_circle</span> 定制化推荐</li>
          <li><span class="material-icons-round">check_circle</span> 优先预约</li>
          <li><span class="material-icons-round">check_circle</span> 专家咨询</li>
        </ul>
        <a class="link">查看更多特权 <span class="material-icons-round">chevron_right</span></a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '@/components/common/Avatar.vue'

const services = ref([
  { name: '问诊记录', icon: 'history' },
  { name: '订单管理', icon: 'receipt_long' },
  { name: '收藏内容', icon: 'favorite' },
  { name: '健康报告', icon: 'description' },
  { name: '我的预约', icon: 'event' },
  { name: '浏览记录', icon: 'history_toggle_off' }
])

const handleSettings = () => {
  // 处理设置
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 16px;
  animation: fade-in 0.3s ease-out;

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .info {
        h2 {
          font-size: $font-size-large;
          margin-bottom: 4px;
        }
        
        p {
          color: $text-secondary;
          font-size: $font-size-small;
        }
      }
    }
    
    .material-icons-round {
      font-size: 24px;
      color: $text-secondary;
      cursor: pointer;
    }
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    
    .material-icons-round {
      color: $primary-color;
    }
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
    
    .data-card {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .material-icons-round {
        font-size: 24px;
        color: $primary-color;
        margin-bottom: 8px;
      }
      
      h3 {
        font-size: $font-size-small;
        margin-bottom: 4px;
      }
      
      p {
        font-size: $font-size-large;
        font-weight: 500;
        margin-bottom: 8px;
      }
      
      .link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: $primary-color;
        font-size: $font-size-small;
        
        .material-icons-round {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
    
    .service-item {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .material-icons-round {
        font-size: 24px;
        color: $primary-color;
        margin-bottom: 8px;
      }
      
      span {
        font-size: $font-size-small;
      }
    }
  }

  .vip-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    
    .vip-list {
      list-style: none;
      margin-bottom: 12px;
      
      li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .material-icons-round {
          font-size: 20px;
          color: $success-color;
        }
      }
    }
    
    .link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: $primary-color;
      
      .material-icons-round {
        font-size: 18px;
      }
    }
  }
}
</style>
