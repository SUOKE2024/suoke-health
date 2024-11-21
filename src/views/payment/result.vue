<template>
  <div class="payment-result-page">
    <div class="header">
      <div class="back" @click="handleBack">
        <i class="icon">←</i>
      </div>
      <h1>支付结果</h1>
    </div>

    <div class="content">
      <div class="result-card" :class="status">
        <!-- 成功状态 -->
        <template v-if="status === 'success'">
          <i class="icon">✅</i>
          <div class="status">支付成功</div>
          <div class="amount">￥{{ amount }}</div>
          <div class="info">
            <div class="info-item">
              <span class="label">订单编号：</span>
              <span>{{ orderNo }}</span>
            </div>
            <div class="info-item">
              <span class="label">支付方式：</span>
              <span>{{ paymentMethod }}</span>
            </div>
            <div class="info-item">
              <span class="label">支付时间：</span>
              <span>{{ payTime }}</span>
            </div>
          </div>
          <div class="actions">
            <SkButton 
              type="primary"
              @click="handleViewOrder"
            >
              查看订单
            </SkButton>
            <SkButton @click="handleBack">
              返回首页
            </SkButton>
          </div>
        </template>

        <!-- 失败状态 -->
        <template v-else-if="status === 'failed'">
          <i class="icon">❌</i>
          <div class="status">支付失败</div>
          <div class="message">{{ errorMessage }}</div>
          <div class="actions">
            <SkButton 
              type="primary"
              @click="handleRetry"
            >
              重新支付
            </SkButton>
            <SkButton @click="handleBack">
              返回首页
            </SkButton>
          </div>
        </template>

        <!-- 处理中状态 -->
        <template v-else>
          <i class="icon">🔄</i>
          <div class="status">处理中</div>
          <div class="message">正在确认支付结果，请稍候...</div>
          <div class="countdown">{{ countdown }}s</div>
        </template>
      </div>

      <!-- 温馨提示 -->
      <div class="tips">
        <div class="title">温馨提示</div>
        <div class="tip-item">
          1. 如遇支付问题，请联系在线客服或拨打客服电话
        </div>
        <div class="tip-item">
          2. 支付成功后，可在"我的订单"中查看订单详情
        </div>
        <div class="tip-item">
          3. 如需申请退款，请在订单详情页操作
        </div>
      </div>

      <!-- 推荐服务 -->
      <div class="recommendations" v-if="status === 'success'">
        <div class="title">为您推荐</div>
        <div class="service-list">
          <div 
            v-for="service in recommendServices"
            :key="service.id"
            class="service-item"
            @click="handleServiceClick(service)"
          >
            <img :src="service.image" :alt="service.name">
            <div class="info">
              <div class="name">{{ service.name }}</div>
              <div class="price">￥{{ service.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { queryPaymentStatus } from '@/api/payment'
import { formatTime } from '@/utils/time'

export default defineComponent({
  name: 'PaymentResult',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const orderNo = ref(route.query.orderNo)
    const amount = ref(route.query.amount)
    const status = ref('pending')
    const errorMessage = ref('')
    const payTime = ref('')
    const paymentMethod = ref('')
    const countdown = ref(15)
    let timer = null

    // 推荐服务
    const recommendServices = ref([
      {
        id: 1,
        name: '专家问诊',
        price: '99.00',
        image: require('@/assets/service1.png')
      },
      {
        id: 2,
        name: '心理咨询',
        price: '199.00',
        image: require('@/assets/service2.png')
      },
      {
        id: 3,
        name: '营养指导',
        price: '149.00',
        image: require('@/assets/service3.png')
      }
    ])

    // 查询支付状态
    const queryStatus = async () => {
      try {
        const res = await queryPaymentStatus(orderNo.value)
        if (res.status === 'success') {
          status.value = 'success'
          payTime.value = formatTime(res.payTime)
          paymentMethod.value = res.paymentMethod
          clearInterval(timer)
        } else if (res.status === 'failed') {
          status.value = 'failed'
          errorMessage.value = res.message
          clearInterval(timer)
        }
      } catch (error) {
        console.error('查询支付状态失败:', error)
        status.value = 'failed'
        errorMessage.value = '查询支付状态失败'
        clearInterval(timer)
      }
    }

    // 返回
    const handleBack = () => {
      if (status.value === 'success') {
        router.replace('/')
      } else {
        router.back()
      }
    }

    // 查看订单
    const handleViewOrder = () => {
      router.push(`/order/${orderNo.value}`)
    }

    // 重新支付
    const handleRetry = () => {
      router.push({
        path: '/payment',
        query: {
          orderNo: orderNo.value,
          amount: amount.value
        }
      })
    }

    // 点击推荐服务
    const handleServiceClick = (service) => {
      router.push(`/service/${service.id}`)
    }

    onMounted(() => {
      // 定时查询支付状态
      queryStatus()
      timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
          if (status.value === 'pending') {
            status.value = 'failed'
            errorMessage.value = '支付超时，请重试'
          }
        } else {
          queryStatus()
        }
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      orderNo,
      amount,
      status,
      errorMessage,
      payTime,
      paymentMethod,
      countdown,
      recommendServices,
      handleBack,
      handleViewOrder,
      handleRetry,
      handleServiceClick
    }
  }
})
</script>

<style scoped lang="scss">
.payment-result-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  
  .back {
    padding: 8px;
    cursor: pointer;
    
    .icon {
      font-size: 20px;
    }
  }
  
  h1 {
    flex: 1;
    text-align: center;
    font-size: 18px;
    margin-right: 40px;
  }
}

.content {
  padding: 15px;
}

.result-card {
  background: white;
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  margin-bottom: 15px;
  
  .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .status {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .amount {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .info {
    text-align: left;
    margin-bottom: 20px;
    
    .info-item {
      margin-bottom: 10px;
      
      .label {
        color: #666;
      }
    }
  }
  
  .message {
    color: #666;
    margin-bottom: 20px;
  }
  
  .countdown {
    color: #999;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  &.success {
    .icon,
    .status {
      color: $success-color;
    }
    
    .amount {
      color: #f56c6c;
    }
  }
  
  &.failed {
    .icon,
    .status {
      color: $danger-color;
    }
  }
  
  &.pending {
    .icon,
    .status {
      color: $warning-color;
    }
  }
}

.tips {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .tip-item {
    color: #666;
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.recommendations {
  background: white;
  border-radius: 8px;
  padding: 20px;
  
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .service-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  .service-item {
    cursor: pointer;
    
    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    
    .info {
      .name {
        font-size: 14px;
        margin-bottom: 4px;
      }
      
      .price {
        color: #f56c6c;
        font-weight: bold;
      }
    }
  }
}
</style>
