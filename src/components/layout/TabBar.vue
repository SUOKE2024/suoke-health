<template>
  <div class="tab-bar">
    <router-link to="/" class="tab-item">首页</router-link>
    <router-link to="/services" class="tab-item">服务</router-link>
    <router-link to="/community" class="tab-item">社区</router-link>
    <router-link to="/profile" class="tab-item">我的</router-link>
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
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
}

.tab-item.router-link-active {
  color: #42b983;
}
</style>
