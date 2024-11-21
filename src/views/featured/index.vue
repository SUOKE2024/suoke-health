<template>
  <div class="featured-page">
    <!-- 个性化定制 -->
    <section class="featured-section">
      <h2 class="section-title">
        <span class="material-icons-round">auto_awesome</span>
        精选服务
      </h2>
      <div class="custom-card">
        <h3>
          <span class="material-icons-round">psychology</span>
          个性化定制
        </h3>
        <p>基于 AI 分析为您推荐</p>
        <div class="tag-list">
          <span class="tag">
            <span class="material-icons-round">coffee</span>
            咖啡
          </span>
          <span class="tag">
            <span class="material-icons-round">restaurant</span>
            营养
          </span>
          <span class="tag">
            <span class="material-icons-round">fitness_center</span>
            运动
          </span>
        </div>
      </div>
    </section>

    <!-- 特色产品 -->
    <section class="featured-section">
      <h2 class="section-title">
        <span class="material-icons-round">stars</span>
        特色产品
      </h2>
      <div class="product-grid">
        <div class="product-card">
          <span class="material-icons-round">coffee_maker</span>
          <h3>高晟庄园</h3>
          <p>定制咖啡</p>
          <span class="tag">限量发售</span>
        </div>
        <div class="product-card">
          <span class="material-icons-round">menu_book</span>
          <h3>健康周刊</h3>
          <p>每周上新</p>
          <span class="tag">订阅优惠</span>
        </div>
      </div>
    </section>

    <!-- 优质供应商 -->
    <section class="featured-section">
      <h2 class="section-title">
        <span class="material-icons-round">diamond</span>
        优质供应商
      </h2>
      <div class="supplier-grid">
        <div class="supplier-card">
          <span class="material-icons-round">store</span>
          <h3>商家入驻</h3>
          <a class="link">申请 <span class="material-icons-round">chevron_right</span></a>
        </div>
        <div class="supplier-card">
          <span class="material-icons-round">handshake</span>
          <h3>品牌合作</h3>
          <a class="link">咨询 <span class="material-icons-round">chevron_right</span></a>
        </div>
        <div class="supplier-card">
          <span class="material-icons-round">storefront</span>
          <h3>渠道加盟</h3>
          <a class="link">入口 <span class="material-icons-round">chevron_right</span></a>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.featured-page {
  padding: 16px;
  animation: fade-in 0.3s ease-out;

  .section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    
    .material-icons-round {
      color: $primary-color;
    }
  }

  .custom-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    transition: transform 0.2s;
    
    &:active {
      transform: scale(0.98);
    }
    
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      
      .material-icons-round {
        color: $primary-color;
      }
    }
  }

  .tag-list {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    
    .tag {
      display: flex;
      align-items: center;
      gap: 4px;
      background: $background-light;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: $font-size-small;
      
      .material-icons-round {
        font-size: 16px;
      }
    }
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
    
    .product-card {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .material-icons-round {
        font-size: 32px;
        color: $primary-color;
        margin-bottom: 8px;
      }
    }
  }

  .supplier-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    
    .supplier-card {
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: transform 0.2s;
      
      &:active {
        transform: scale(0.98);
      }
      
      .material-icons-round {
        font-size: 24px;
        color: $primary-color;
        margin-bottom: 8px;
      }
      
      .link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: $primary-color;
        margin-top: 8px;
        
        .material-icons-round {
          font-size: 18px;
          margin: 0;
        }
      }
    }
  }
}
</style>
