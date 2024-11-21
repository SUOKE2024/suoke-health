<template>
  <div 
    class="avatar" 
    :class="[size, status, { 'clickable': clickable }]"
    @click="$emit('click')"
  >
    <span class="material-icons-round">{{ defaultIcon }}</span>
    <span v-if="showStatus" class="status" :class="status"></span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'medium'
  },
  status: {
    type: String,
    default: 'offline'
  },
  showStatus: Boolean,
  clickable: Boolean,
  defaultIcon: {
    type: String,
    default: 'person'
  }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.online {
    background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
    .material-icons-round {
      color: #2E7D32;
    }
  }

  &.offline {
    background: linear-gradient(135deg, #FAFAFA, #F5F5F5);
    .material-icons-round {
      color: #9E9E9E;
    }
  }

  &.clickable {
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    &:active {
      transform: scale(0.95);
    }
  }

  &.small {
    width: var(--avatar-size-small);
    height: var(--avatar-size-small);
    .material-icons-round { font-size: calc(var(--font-size-base) * 1.25); }
  }

  &.medium {
    width: var(--avatar-size-medium);
    height: var(--avatar-size-medium);
    .material-icons-round { font-size: calc(var(--font-size-base) * 1.5); }
  }

  &.large {
    width: var(--avatar-size-large);
    height: var(--avatar-size-large);
    .material-icons-round { font-size: calc(var(--font-size-base) * 1.75); }
  }

  .material-icons-round {
    transition: color 0.3s ease;
  }

  .status {
    position: absolute;
    right: 2px;
    bottom: 2px;
    width: clamp(8px, 2.133vw, 10px);
    height: clamp(8px, 2.133vw, 10px);
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

    &.online { 
      background: $success-color;
      animation: pulse 2s infinite;
    }
    &.offline { background: $text-secondary; }
  }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
