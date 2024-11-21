<template>
  <div class="prescription-detail">
    <!-- 处方头部 -->
    <div class="prescription-header">
      <div class="hospital">在线互联网医院</div>
      <div class="title">电子处方笺</div>
      <div class="no">处方号：{{ prescription.prescriptionNo }}</div>
    </div>

    <!-- 患者信息 -->
    <div class="section">
      <div class="section-title">患者信息</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">姓名</span>
          <span class="value">{{ prescription.patientName }}</span>
        </div>
        <div class="info-item">
          <span class="label">性别</span>
          <span class="value">{{ prescription.patientGender }}</span>
        </div>
        <div class="info-item">
          <span class="label">年龄</span>
          <span class="value">{{ prescription.patientAge }}岁</span>
        </div>
        <div class="info-item">
          <span class="label">就诊时间</span>
          <span class="value">{{ formatTime(prescription.createTime) }}</span>
        </div>
      </div>
    </div>

    <!-- 诊断信息 -->
    <div class="section">
      <div class="section-title">诊断信息</div>
      <div class="diagnosis">
        <div class="main">
          <span class="label">主要诊断：</span>
          <span>{{ prescription.mainDiagnosis }}</span>
        </div>
        <div class="other" v-if="prescription.otherDiagnosis">
          <span class="label">其他诊断：</span>
          <span>{{ prescription.otherDiagnosis }}</span>
        </div>
      </div>
    </div>

    <!-- 药品信息 -->
    <div class="section">
      <div class="section-title">药品信息</div>
      <div class="medicine-table">
        <table>
          <thead>
            <tr>
              <th>药品名称</th>
              <th>规格</th>
              <th>用法用量</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medicine in prescription.medicines" :key="medicine.id">
              <td>{{ medicine.name }}</td>
              <td>{{ medicine.spec }}</td>
              <td>{{ medicine.usage }}</td>
              <td>{{ medicine.quantity }}{{ medicine.unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 医生信息 -->
    <div class="section">
      <div class="section-title">开具医生</div>
      <div class="doctor-info">
        <img :src="prescription.doctorAvatar" :alt="prescription.doctorName">
        <div class="info">
          <div class="name">{{ prescription.doctorName }}</div>
          <div class="title">{{ prescription.doctorTitle }}</div>
          <div class="department">{{ prescription.department }}</div>
        </div>
        <div class="signature">
          <img :src="prescription.signature" alt="医生签名">
          <div class="time">{{ formatTime(prescription.signTime) }}</div>
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <div class="section">
      <div class="section-title">注意事项</div>
      <div class="notices">
        <div class="notice-item" v-for="(notice, index) in notices" :key="index">
          {{ notice }}
        </div>
      </div>
    </div>

    <!-- 处方底部 -->
    <div class="prescription-footer">
      <div class="qrcode">
        <img :src="prescription.qrcode" alt="处方二维码">
        <div class="tip">扫码查验处方真伪</div>
      </div>
      <div class="seal">
        <img src="@/assets/hospital-seal.png" alt="医院电子签章">
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <template v-if="prescription.status === 'pending'">
        <SkButton 
          type="primary"
          @click="$emit('pay', prescription)"
        >
          去支付
        </SkButton>
      </template>
      
      <template v-else-if="prescription.status === 'paid'">
        <SkButton 
          type="primary"
          @click="$emit('purchase', prescription)"
        >
          购买药品
        </SkButton>
      </template>
      
      <SkButton @click="$emit('download', prescription)">
        下载处方
      </SkButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { formatTime } from '@/utils/time'

export default defineComponent({
  name: 'PrescriptionDetail',
  props: {
    prescription: {
      type: Object,
      required: true
    }
  },
  emits: ['pay', 'purchase', 'download'],
  setup() {
    const notices = ref([
      '1. 处方药必须凭处方在药房购买。',
      '2. 按医嘱用药，禁止自行加减药量。',
      '3. 处方有效期为3天，请及时购药。',
      '4. 如出现不良反应请立即就医。'
    ])

    return {
      notices,
      formatTime
    }
  }
})
</script>

<style scoped lang="scss">
.prescription-detail {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.prescription-header {
  text-align: center;
  margin-bottom: 20px;
  
  .hospital {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .no {
    color: #666;
  }
}

.section {
  margin-bottom: 20px;
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid $primary-color;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  
  .info-item {
    .label {
      color: #666;
      margin-right: 10px;
    }
  }
}

.diagnosis {
  .main,
  .other {
    margin-bottom: 10px;
    
    .label {
      color: #666;
    }
  }
}

.medicine-table {
  table {
    width: 100%;
    border-collapse: collapse;
    
    th,
    td {
      padding: 10px;
      text-align: left;
      border: 1px solid #eee;
    }
    
    th {
      background: #f9f9f9;
      font-weight: normal;
      color: #666;
    }
  }
}

.doctor-info {
  display: flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .info {
    flex: 1;
    
    .name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    
    .title,
    .department {
      color: #666;
      font-size: 14px;
    }
  }
  
  .signature {
    text-align: center;
    
    img {
      width: 100px;
      height: 40px;
      object-fit: contain;
      margin-bottom: 4px;
    }
    
    .time {
      font-size: 12px;
      color: #999;
    }
  }
}

.notices {
  .notice-item {
    color: #666;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.prescription-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  
  .qrcode {
    text-align: center;
    
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 4px;
    }
    
    .tip {
      font-size: 12px;
      color: #999;
    }
  }
  
  .seal {
    img {
      width: 120px;
      height: 120px;
      opacity: 0.8;
    }
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
</style>
