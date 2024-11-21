<template>
  <div class="quick-menu">
    <div class="menu-overlay" @click="$emit('close')"></div>
    <div class="menu-content">
      <div 
        v-for="item in menuItems" 
        :key="item.action"
        class="menu-item icon-text"
        @click="handleSelect(item.action)"
      >
        <span class="material-icons-round">{{ item.icon }}</span>
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  {
    icon: 'chat',
    label: '发起会话',
    action: 'new_chat'
  },
  {
    icon: 'group_add',
    label: '创建群组',
    action: 'new_group'
  },
  {
    icon: 'contact_page',
    label: '添加联系人',
    action: 'add_contact'
  }
]

const emit = defineEmits(['close', 'select'])

const handleSelect = (action: string) => {
  emit('select', action)
}
</script>

<style lang="scss" scoped>
.quick-menu {
  position: fixed;
  inset: 0;
  z-index: 100;

  .menu-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .menu-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 16px 16px 0 0;
    padding: 16px;
    transform: translateY(0);
    animation: slide-up 0.3s ease;

    .menu-item {
      padding: 12px;
      border-radius: 8px;
      
      &:active {
        background: $background-light;
      }

      .material-icons-round {
        color: $primary-color;
        font-size: var(--font-size-large);
      }

      .label {
        font-size: var(--font-size-base);
      }
    }
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
