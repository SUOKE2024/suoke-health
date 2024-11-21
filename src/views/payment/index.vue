<template>
  <div class="payment-page">
    <div class="header">
      <div class="back" @click="router.back()">
        <i class="icon">←</i>
      </div>
      <h1>支付</h1>
    </div>

    <div class="content">
      <!-- 订单信息 -->
      <div class="order-info">
        <div class="amount">￥{{ orderInfo.amount }}</div>
        <div class="title">{{ orderInfo.title }}</div>
        <div class="order-no">订单号：{{ orderInfo.orderNo }}</div>
      </div>

      <!-- 支付方式 -->
      <div class="payment-methods">
        <div class="section-title">选择支付方式</div>
        
        <div class="method-list">
          <div 
            v-for="method in paymentMethods"
            :key="method.id"
            class="method-item"
            :class="{ active: selectedMethod === method.id }"
            @click="selectedMethod = method.id"
          >
            <img :src="method.icon" :alt="method.name" class="icon">
            <div class="info">
              <div class="name">{{ method.name }}</div>
              <div class="desc">{{ method.description }}</div>
            </div>
            <div class="check">
              <i class="icon">✓</i>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠信息 -->
      <div class="discount-info" v-if="discounts.length">
        <div class="section-title">优惠信息</div>
        
        <div class="discount-list">
          <div 
            v-for="discount in discounts"
            :key="discount.id"
            class="discount-item"
            :class="{ active: selectedDiscount === discount.id }"
            @click="handleSelectDiscount(discount)"
          >
            <div class="type">{{ discount.type }}</div>
            <div class="value">{{ discount.value }}</div>
            <div class="desc">{{ discount.description }}</div>
            <div class="check">
              <i class="icon">✓</i>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付详情 -->
      <div class="payment-detail">
        <div class="detail-item">
          <span>订单金额</span>
          <span>￥{{ orderInfo.amount }}</span>
        </div>
        <div class="detail-item" v-if="discountAmount > 0">
          <span>优惠金额</span>
          <span>-￥{{ discountAmount }}</span>
        </div>
        <div class="detail-item total">
          <span>实付金额</span>
          <span>￥{{ finalAmount }}</span>
        </div>
      </div>
    </div>

    <!-- 支付按钮 -->
    <div class="footer">
      <div class="amount-info">
        <span>实付金额：</span>
        <span class="amount">￥{{ finalAmount }}</span>
      </div>
      <SkButton 
        type="primary"
        :loading="paying"
        @click="handlePay"
      >
        立即支付
      </SkButton>
    </div>

    <!-- 支付结果弹窗 -->
    <SkDialog
      v-model:visible="showResult"
      :show-close="false"
      width="80%"
    >
      <div class="payment-result" :class="paymentStatus">
        <i class="icon">{{ paymentStatus === 'success' ? '✅' : '❌' }}</i>
        <div class="status">{{ paymentStatus === 'success' ? '支付成功' : '支付失败' }}</div>
        <div class="message">{{ resultMessage }}</div>
        <div class="actions">
          <SkButton 
            v-if="paymentStatus === 'success'"
            type="primary"
            @click="handlePaymentSuccess"
          >
            完成
          </SkButton>
          <SkButton 
            v-else
            @click="showResult = false"
          >
            重试
          </SkButton>
        </div>
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPayment, queryPaymentStatus } from '@/api/payment'

export default defineComponent({
  name: 'Payment',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    // 订单信息
    const orderInfo = ref({
      orderNo: route.query.orderNo,
      amount: route.query.amount,
      title: route.query.title
    })

    // 支付方式
    const paymentMethods = [
      {
        id: 'wxpay',
        name: '微信支付',
        description: '推荐使用微信支付',
        icon: require('@/assets/wxpay.png')
      },
      {
        id: 'alipay',
        name: '支付宝',
        description: '推荐有支付宝账户的用户使用',
        icon: require('@/assets/alipay.png')
      }
    ]

    const selectedMethod = ref('wxpay')

    // 优惠信息
    const discounts = ref([
      {
        id: 1,
        type: '优惠券',
        value: '满100减20',
        description: '仅限首次问诊使用',
        amount: 20
      },
      {
        id: 2,
        type: '会员折扣',
        value: '95折',
        description: '会员专享优惠',
        amount: computed(() => orderInfo.value.amount * 0.05)
      }
    ])

    const selectedDiscount = ref(null)
    const discountAmount = ref(0)

    // 选择优惠
    const handleSelectDiscount = (discount) => {
      if (selectedDiscount.value === discount.id) {
        selectedDiscount.value = null
        discountAmount.value = 0
      } else {
        selectedDiscount.value = discount.id
        discountAmount.value = discount.amount
      }
    }

    // 最终支付金额
    const finalAmount = computed(() => {
      return Math.max(orderInfo.value.amount - discountAmount.value, 0).toFixed(2)
    })

    // 支付状态
    const paying = ref(false)
    const showResult = ref(false)
    const paymentStatus = ref('')
    const resultMessage = ref('')

    // 处理支付
    const handlePay = async () => {
      if (paying.value) return
      
      try {
        paying.value = true
        
        // 创建支付订单
        const paymentData = await createPayment({
          orderNo: orderInfo.value.orderNo,
          amount: finalAmount.value,
          method: selectedMethod.value,
          discountId: selectedDiscount.value
        })

        // 调用支付SDK
        if (selectedMethod.value === 'wxpay') {
          // 调用微信支付
          await callWxPay(paymentData)
        } else {
          // 调用支付宝支付
          await callAliPay(paymentData)
        }

        // 轮询支付结果
        await checkPaymentStatus(paymentData.paymentNo)

      } catch (error) {
        console.error('支付失败:', error)
        showPaymentResult('failed', error.message)
      } finally {
        paying.value = false
      }
    }

    // 调用微信支付
    const callWxPay = (paymentData) => {
      return new Promise((resolve, reject) => {
        // 实际项目中需要调用微信支付SDK
        setTimeout(resolve, 1000)
      })
    }

    // 调用支付宝支付
    const callAliPay = (paymentData) => {
      return new Promise((resolve, reject) => {
        // 实际项目中需要调用支付宝支付SDK
        setTimeout(resolve, 1000)
      })
    }

    // 检查支付状态
    const checkPaymentStatus = async (paymentNo) => {
      let retryCount = 0
      const maxRetries = 10

      while (retryCount < maxRetries) {
        try {
          const status = await queryPaymentStatus(paymentNo)
          
          if (status === 'success') {
            showPaymentResult('success')
            return
          }
          
          if (status === 'failed') {
            throw new Error('支付失败，请重试')
          }
          
          // 继续等待
          await new Promise(resolve => setTimeout(resolve, 1000))
          retryCount++
          
        } catch (error) {
          throw error
        }
      }

      throw new Error('支付超时，请稍后查看订单状态')
    }

    // 显示支付结果
    const showPaymentResult = (status, message = '') => {
      paymentStatus.value = status
      resultMessage.value = message || (status === 'success' ? '感谢您的支付' : '请重新尝试支付')
      showResult.value = true
    }

    // 支付成功后的处理
    const handlePaymentSuccess = () => {
      // 根据订单类型跳转到不同页面
      router.replace({
        path: '/payment/success',
        query: {
          orderNo: orderInfo.value.orderNo
        }
      })
    }

    return {
      router,
      orderInfo,
      paymentMethods,
      selectedMethod,
      discounts,
      selectedDiscount,
      discountAmount,
      finalAmount,
      paying,
      showResult,
      paymentStatus,
      resultMessage,
      handleSelectDiscount,
      handlePay,
      handlePaymentSuccess
    }
  }
})
</script>

<style scoped lang="scss">
.payment-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

.header {
  display: flex;
  align-items: center;
  padding: 15px;
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

.order-info {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 15px;
  
  .amount {
    font-size: 32px;
    font-weight: bold;
    color: #f56c6c;
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .order-no {
    font-size: 12px;
    color: #999;
  }
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.payment-methods {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.05);
    
    .check {
      color: $primary-color;
    }
  }
  
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .info {
    flex: 1;
    
    .name {
      font-weight: bold;
    }
    
    .desc {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
  
  .check {
    color: transparent;
  }
}

.discount-info {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
}

.discount-item {
  position: relative;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.05);
    
    .check {
      color: $primary-color;
    }
  }
  
  .type {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
  
  .value {
    font-size: 16px;
    font-weight: bold;
    color: #f56c6c;
    margin-bottom: 4px;
  }
  
  .desc {
    font-size: 12px;
    color: #999;
  }
  
  .check {
    position: absolute;
    top: 15px;
    right: 15px;
    color: transparent;
  }
}

.payment-detail {
  background: white;
  border-radius: 8px;
  padding: 20px;
  
  .detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    
    &.total {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      font-weight: bold;
      color: #f56c6c;
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  
  .amount-info {
    .amount {
      font-size: 20px;
      font-weight: bold;
      color: #f56c6c;
    }
  }
}

.payment-result {
  text-align: center;
  padding: 30px 20px;
  
  .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .status {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .message {
    color: #666;
    margin-bottom: 20px;
  }
  
  &.success {
    .icon,
    .status {
      color: $success-color;
    }
  }
  
  &.failed {
    .icon,
    .status {
      color: $danger-color;
    }
  }
}
</style>
