<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="type">
      <i class="toast-icon" v-if="icon">{{ icon }}</i>
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  setup(props) {
    const visible = ref(false)
    const icon = ref('')

    const iconMap = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }

    const show = () => {
      visible.value = true
      icon.value = iconMap[props.type]
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }

    return {
      visible,
      icon,
      show
    }
  }
})
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 8px;

  &.success { background: rgba(103, 194, 58, 0.9); }
  &.error { background: rgba(245, 108, 108, 0.9); }
  &.warning { background: rgba(230, 162, 60, 0.9); }
}

.toast-icon {
  font-size: 16px;
}

.toast-message {
  font-size: 14px;
}
</style>
