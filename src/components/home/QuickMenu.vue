<template>
  <div class="quick-menu" v-if="visible">
    <div class="menu-item" v-for="item in menuItems" :key="item.action" @click="handleSelect(item)">
      <span class="material-icons-round">{{ item.icon }}</span>
      <span class="label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible', 'select'])

const menuItems = ref([
  { label: '发起问诊', icon: 'medical_services', action: 'consultation' },
  { label: '加入社群', icon: 'group_add', action: 'join-community' },
  { label: '创建群组', icon: 'groups', action: 'create-group' },
  { label: '添加好友', icon: 'person_add', action: 'add-friend' },
  { label: '扫一扫', icon: 'qr_code_scanner', action: 'scan' }
])

const handleSelect = (item: any) => {
  emit('select', item.action)
}
</script>

<style lang="scss" scoped>
.quick-menu {
  position: fixed;
  right: 16px;
  bottom: 72px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 8px 0;

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 12px;
    min-width: 160px;
    
    .material-icons-round {
      color: $primary-color;
    }
    
    .label {
      font-size: $font-size-base;
    }
    
    &:active {
      background: $background-light;
    }
  }
}
</style>
