<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <header class="header">
      <h1>速客健康</h1>
    </header>

    <!-- 轮播图区域 -->
    <div class="banner">
      <img src="@/assets/banner.png" alt="banner">
    </div>

    <!-- 功能区域 -->
    <div class="features">
      <div class="feature-item">
        <div class="icon">🏥</div>
        <span>预约挂号</span>
      </div>
      <div class="feature-item">
        <div class="icon">💊</div>
        <span>在线问诊</span>
      </div>
      <div class="feature-item">
        <div class="icon">📋</div>
        <span>健康档案</span>
      </div>
      <div class="feature-item">
        <div class="icon">🔍</div>
        <span>体检预约</span>
      </div>
    </div>

    <!-- 健康资讯 -->
    <div class="news">
      <h2>健康资讯</h2>
      <div class="news-list">
        <div class="news-item">
          <h3>秋季养生指南</h3>
          <p>立秋后如何养生？专家为您支招...</p>
        </div>
        <div class="news-item">
          <h3>科学运动指南</h3>
          <p>科学运动，远离亚健康...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {
    return {}
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 60px;
}

.header {
  background: #42b983;
  color: white;
  padding: 15px;
  text-align: center;
}

.banner {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  margin-bottom: 20px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  gap: 15px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-item .icon {
  font-size: 24px;
  background: #f0f9f4;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news {
  padding: 20px;
}

.news h2 {
  margin-bottom: 15px;
  color: #333;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.news-item h3 {
  color: #333;
  margin-bottom: 8px;
}

.news-item p {
  color: #666;
  font-size: 14px;
}
</style>
