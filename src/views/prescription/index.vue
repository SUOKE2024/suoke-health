<template>
  <div class="prescription-page">
    <div class="header">
      <div class="back" @click="router.back()">
        <i class="icon">←</i>
      </div>
      <h1>处方管理</h1>
    </div>

    <!-- 处方列表 -->
    <div class="content" v-loading="loading">
      <div class="prescription-list">
        <div 
          v-for="item in prescriptions"
          :key="item.id"
          class="prescription-card"
          @click="handlePrescriptionClick(item)"
        >
          <div class="header">
            <div class="status" :class="item.status">
              {{ item.statusText }}
            </div>
            <div class="time">{{ formatTime(item.createTime) }}</div>
          </div>
          
          <div class="info">
            <div class="doctor">
              <img :src="item.doctorAvatar" :alt="item.doctorName">
              <div class="detail">
                <div class="name">{{ item.doctorName }}</div>
                <div class="title">{{ item.doctorTitle }}</div>
              </div>
            </div>
            
            <div class="diagnosis">
              <div class="label">诊断结果</div>
              <div class="value">{{ item.diagnosis }}</div>
            </div>
            
            <div class="medicine-list">
              <div class="label">开具药品</div>
              <div 
                v-for="medicine in item.medicines"
                :key="medicine.id"
                class="medicine-item"
              >
                <span class="name">{{ medicine.name }}</span>
                <span class="spec">{{ medicine.spec }}</span>
                <span class="usage">{{ medicine.usage }}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <template v-if="item.status === 'pending'">
              <SkButton 
                type="primary"
                size="small"
                @click.stop="handlePay(item)"
              >
                去支付
              </SkButton>
            </template>
            
            <template v-else-if="item.status === 'paid'">
              <SkButton 
                type="primary"
                size="small"
                @click.stop="handlePurchase(item)"
              >
                购买药品
              </SkButton>
              <SkButton 
                size="small"
                @click.stop="handleDownload(item)"
              >
                下载处方
              </SkButton>
            </template>
            
            <template v-else>
              <SkButton 
                size="small"
                @click.stop="handleDownload(item)"
              >
                下载处方
              </SkButton>
            </template>
          </div>
        </div>
      </div>

      <!-- 无数据提示 -->
      <div class="empty" v-if="!loading && !prescriptions.length">
        <img src="@/assets/empty.png" alt="暂无处方">
        <div class="text">暂无处方记录</div>
      </div>
    </div>

    <!-- 处方详情弹窗 -->
    <SkDialog
      v-model:visible="showDetail"
      title="处方详情"
      width="90%"
    >
      <PrescriptionDetail
        v-if="showDetail"
        :prescription="currentPrescription"
        @close="showDetail = false"
        @pay="handlePay"
        @purchase="handlePurchase"
        @download="handleDownload"
      />
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPrescriptions } from '@/api/prescription'
import { formatTime } from '@/utils/time'
import PrescriptionDetail from '@/components/prescription/PrescriptionDetail.vue'

export default defineComponent({
  name: 'PrescriptionList',
  components: {
    PrescriptionDetail
  },
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const prescriptions = ref([])
    const showDetail = ref(false)
    const currentPrescription = ref(null)

    // 获取处方列表
    const fetchPrescriptions = async () => {
      loading.value = true
      try {
        const data = await getPrescriptions()
        prescriptions.value = data.map(item => ({
          ...item,
          statusText: getStatusText(item.status)
        }))
      } catch (error) {
        console.error('获取处方列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 获取状态文本
    const getStatusText = (status) => {
      const statusMap = {
        pending: '待支付',
        paid: '已支付',
        completed: '已完成',
        expired: '已过期'
      }
      return statusMap[status] || status
    }

    // 查看处方详情
    const handlePrescriptionClick = (prescription) => {
      currentPrescription.value = prescription
      showDetail.value = true
    }

    // 支付处方
    const handlePay = (prescription) => {
      router.push({
        path: '/payment',
        query: {
          orderNo: prescription.orderNo,
          amount: prescription.amount,
          title: '处方支付'
        }
      })
    }

    // 购买药品
    const handlePurchase = (prescription) => {
      router.push({
        path: '/medicine/purchase',
        query: {
          prescriptionId: prescription.id
        }
      })
    }

    // 下载处方
    const handleDownload = async (prescription) => {
      try {
        // 实现下载逻辑
      } catch (error) {
        console.error('下载处方失败:', error)
      }
    }

    onMounted(() => {
      fetchPrescriptions()
    })

    return {
      loading,
      prescriptions,
      showDetail,
      currentPrescription,
      formatTime,
      handlePrescriptionClick,
      handlePay,
      handlePurchase,
      handleDownload
    }
  }
})
</script>

<style scoped lang="scss">
.prescription-page {
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

.prescription-card {
  background: white;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #f9f9f9;
    
    .status {
      font-weight: bold;
      
      &.pending {
        color: $warning-color;
      }
      
      &.paid {
        color: $primary-color;
      }
      
      &.completed {
        color: $success-color;
      }
      
      &.expired {
        color: $danger-color;
      }
    }
    
    .time {
      font-size: 12px;
      color: #999;
    }
  }
  
  .info {
    padding: 15px;
    
    .doctor {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .detail {
        .name {
          font-weight: bold;
        }
        
        .title {
          font-size: 12px;
          color: #666;
        }
      }
    }
    
    .diagnosis {
      margin-bottom: 15px;
      
      .label {
        color: #666;
        margin-bottom: 4px;
      }
    }
    
    .medicine-list {
      .label {
        color: #666;
        margin-bottom: 8px;
      }
      
      .medicine-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        
        .name {
          font-weight: bold;
          margin-right: 10px;
        }
        
        .spec {
          color: #666;
          margin-right: 10px;
        }
        
        .usage {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  
  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 15px;
    border-top: 1px solid #eee;
  }
}

.empty {
  text-align: center;
  padding: 40px 0;
  
  img {
    width: 120px;
    margin-bottom: 15px;
  }
  
  .text {
    color: #999;
  }
}
</style>
