<template>
  <div class="tab-bar">
    <router-link to="/" class="tab-item">
      <span class="icon">🏠</span>
      <span>首页</span>
    </router-link>
    <router-link to="/services" class="tab-item">
      <span class="icon">💊</span>
      <span>服务</span>
    </router-link>
    <router-link to="/featured" class="tab-item">
      <span class="icon">⭐</span>
      <span>精选</span>
    </router-link>
    <router-link to="/community" class="tab-item">
      <span class="icon">👥</span>
      <span>社区</span>
    </router-link>
    <router-link to="/profile" class="tab-item">
      <span class="icon">👤</span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
  font-size: 12px;
}

.tab-item .icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.tab-item.router-link-active {
  color: #42b983;
}
</style>
