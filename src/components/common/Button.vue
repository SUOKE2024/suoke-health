<template>
  <button 
    class="btn" 
    :class="[type, size, { 'block': block, 'disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'medium'
  },
  block: Boolean,
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: mix(white, $primary-color, 20%);
    border-color: mix(white, $primary-color, 20%);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:active {
      transform: none;
    }
  }
  
  &.block {
    width: 100%;
  }
  
  // 尺寸
  &.small {
    padding: 4px 12px;
    font-size: var(--font-size-small);
  }
  
  &.large {
    padding: 12px 24px;
    font-size: var(--font-size-medium);
  }
  
  // 类型
  &.primary {
    background: $primary-color;
    border-color: $primary-color;
    color: #fff;
  }
  
  &.default {
    background: #fff;
    border-color: $border-color;
    color: $text-primary;
    
    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
  }
}
</style>
