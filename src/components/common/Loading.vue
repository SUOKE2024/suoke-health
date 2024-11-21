<template>
  <transition name="fade">
    <div v-if="show" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <div class="loading-text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  color: #666;
}
</style>
