<template>
  <div class="tab-bar">
    <router-link 
      v-for="item in tabs" 
      :key="item.path"
      :to="item.path"
      class="tab-item"
    >
      <span class="material-icons-round">{{ item.icon }}</span>
      <span class="label">{{ item.label }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  {
    label: '首页',
    path: '/',
    icon: 'home'
  },
  {
    label: '服务',
    path: '/services',
    icon: 'medical_services'
  },
  {
    label: '精选',
    path: '/featured',
    icon: 'star'
  },
  {
    label: '社区',
    path: '/community',
    icon: 'groups'
  },
  {
    label: '我的',
    path: '/profile',
    icon: 'person'
  }
])
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  background: #fff;
  display: flex;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $text-secondary;
    text-decoration: none;
    
    .material-icons-round {
      font-size: 24px;
      margin-bottom: 4px;
    }
    
    .label {
      font-size: 12px;
    }
    
    &.router-link-active {
      color: $primary-color;
    }
  }
}
</style>
