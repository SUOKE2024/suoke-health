<template>
  <transition name="dialog-fade">
    <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
      <div class="dialog" @click.stop>
        <div class="dialog-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="handleClose">✕</button>
        </div>
        <div class="dialog-content">
          <slot></slot>
        </div>
        <div class="dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
        <div class="dialog-footer" v-else>
          <button class="btn cancel" @click="handleClose">{{ cancelText }}</button>
          <button class="btn confirm" @click="handleConfirm">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:visible', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:visible', false)
      emit('cancel')
    }

    const handleConfirm = () => {
      emit('confirm')
      emit('update:visible', false)
    }

    const handleOverlayClick = () => {
      if (props.closeOnClickOverlay) {
        handleClose()
      }
    }

    return {
      handleClose,
      handleConfirm,
      handleOverlayClick
    }
  }
})
</script>

<style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.dialog {
  background: white;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
  }
}

.close-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #666;
  }
}

.dialog-content {
  padding: 20px;
  overflow-y: auto;
}

.dialog-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &.cancel {
    border: 1px solid #ddd;
    background: white;
    
    &:hover {
      background: #f5f5f5;
    }
  }

  &.confirm {
    border: none;
    background: $primary-color;
    color: white;

    &:hover {
      opacity: 0.9;
    }
  }
}

// 动画
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
