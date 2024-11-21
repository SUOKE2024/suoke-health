<template>
  <div class="services-page">
    <!-- 智能服务 -->
    <section class="service-section">
      <h2 class="section-title">智能服务</h2>
      <div class="service-grid">
        <div class="service-item" v-for="item in services" :key="item.id">
          <span class="material-icons-round">{{ item.icon }}</span>
          <span class="label">{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- 新品发布 -->
    <section class="service-section">
      <div class="section-header">
        <h2 class="section-title">新品发布</h2>
        <span class="more-link">
          更多 <span class="material-icons-round">chevron_right</span>
        </span>
      </div>
      <div class="new-product">
        <span class="material-icons-round">new_releases</span>
        <h3>智能心电监测</h3>
        <p>新功能已上线...</p>
      </div>
    </section>

    <!-- 精选内容 -->
    <section class="service-section">
      <div class="section-header">
        <h2 class="section-title">精选内容</h2>
        <span class="more-link">
          更多 <span class="material-icons-round">chevron_right</span>
        </span>
      </div>
      <div class="featured-content">
        <span class="material-icons-round">auto_awesome</span>
        <h3>秋季养生指南</h3>
        <p>专家建议...</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const services = ref([
  { id: 1, name: '智能问诊', icon: 'health_and_safety' },
  { id: 2, name: '健康档案', icon: 'folder_shared' },
  { id: 3, name: '用药管理', icon: 'medication' },
  { id: 4, name: '检验解读', icon: 'science' },
  { id: 5, name: '数据报告', icon: 'analytics' },
  { id: 6, name: '设备连接', icon: 'devices' }
])
</script>

<style lang="scss" scoped>
.services-page {
  padding: 16px;
  
  .service-section {
    margin-bottom: 24px;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .more-link {
        color: $text-secondary;
        font-size: $font-size-small;
        display: flex;
        align-items: center;
        
        .material-icons-round {
          font-size: 18px;
        }
      }
    }
    
    .section-title {
      font-size: $font-size-medium;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
  
  .service-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    
    .service-item {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      
      .material-icons-round {
        font-size: 32px;
        color: $primary-color;
        margin-bottom: 8px;
      }
      
      .label {
        font-size: $font-size-small;
      }
    }
  }
  
  .new-product,
  .featured-content {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    
    .material-icons-round {
      font-size: 24px;
      color: $primary-color;
      margin-bottom: 8px;
    }
    
    h3 {
      font-size: $font-size-base;
      margin-bottom: 8px;
    }
    
    p {
      color: $text-secondary;
      font-size: $font-size-small;
    }
  }
}
</style>
