<template>
  <div class="consultation">
    <div class="header">
      <h1>在线问诊</h1>
      <div class="tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.value"
          class="tab-item"
          :class="{ active: currentTab === tab.value }"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 快速问诊 -->
      <template v-if="currentTab === 'quick'">
        <div class="quick-consultation">
          <div class="section-title">常见症状</div>
          <div class="symptoms-grid">
            <div 
              v-for="symptom in commonSymptoms" 
              :key="symptom.id"
              class="symptom-item"
              @click="handleSymptomSelect(symptom)"
            >
              <i class="icon">{{ symptom.icon }}</i>
              <span>{{ symptom.name }}</span>
            </div>
          </div>

          <div class="section-title">科室选择</div>
          <div class="departments-grid">
            <div 
              v-for="dept in departments" 
              :key="dept.id"
              class="department-item"
              @click="handleDepartmentSelect(dept)"
            >
              <i class="icon">{{ dept.icon }}</i>
              <span>{{ dept.name }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 专家问诊 -->
      <template v-else-if="currentTab === 'expert'">
        <div class="expert-list">
          <div 
            v-for="doctor in doctors" 
            :key="doctor.id"
            class="doctor-card"
            @click="handleDoctorSelect(doctor)"
          >
            <img :src="doctor.avatar" :alt="doctor.name" class="avatar">
            <div class="info">
              <div class="name">
                {{ doctor.name }}
                <span class="title">{{ doctor.title }}</span>
              </div>
              <div class="department">{{ doctor.department }}</div>
              <div class="specialty">擅长：{{ doctor.specialty }}</div>
              <div class="stats">
                <div class="stat-item">
                  <span class="label">问诊量</span>
                  <span class="value">{{ doctor.consultCount }}</span>
                </div>
                <div class="stat-item">
                  <span class="label">好评率</span>
                  <span class="value">{{ doctor.rating }}%</span>
                </div>
              </div>
            </div>
            <div class="action">
              <div class="price">￥{{ doctor.price }}</div>
              <button class="consult-btn">立即问诊</button>
            </div>
          </div>
        </div>
      </template>

      <!-- 我的问诊 -->
      <template v-else>
        <div class="my-consultations">
          <div 
            v-for="record in consultationRecords" 
            :key="record.id"
            class="record-card"
            @click="handleRecordDetail(record)"
          >
            <div class="doctor-info">
              <img :src="record.doctorAvatar" :alt="record.doctorName" class="avatar">
              <div class="info">
                <div class="name">{{ record.doctorName }}</div>
                <div class="department">{{ record.department }}</div>
              </div>
              <div class="status" :class="record.status">
                {{ record.statusText }}
              </div>
            </div>
            <div class="consultation-info">
              <div class="time">{{ formatTime(record.time) }}</div>
              <div class="description">{{ record.description }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 问诊表单弹窗 -->
    <SkDialog
      v-model:visible="showConsultForm"
      title="填写问诊信息"
      width="90%"
    >
      <ConsultationForm
        :department="selectedDepartment"
        :symptom="selectedSymptom"
        :doctor="selectedDoctor"
        @submit="handleConsultSubmit"
        @cancel="showConsultForm = false"
      />
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatTime } from '@/utils/time'
import ConsultationForm from '@/components/consultation/ConsultationForm.vue'

export default defineComponent({
  name: 'Consultation',
  components: {
    ConsultationForm
  },
  setup() {
    const router = useRouter()
    const currentTab = ref('quick')
    const showConsultForm = ref(false)
    const selectedDepartment = ref(null)
    const selectedSymptom = ref(null)
    const selectedDoctor = ref(null)

    const tabs = [
      { label: '快速问诊', value: 'quick' },
      { label: '专家问诊', value: 'expert' },
      { label: '我的问诊', value: 'records' }
    ]

    const commonSymptoms = [
      { id: 1, name: '发烧', icon: '🤒' },
      { id: 2, name: '咳嗽', icon: '😷' },
      { id: 3, name: '头痛', icon: '🤕' },
      { id: 4, name: '腹痛', icon: '🤢' },
      { id: 5, name: '失眠', icon: '😴' },
      { id: 6, name: '过敏', icon: '🤧' }
    ]

    const departments = [
      { id: 1, name: '内科', icon: '🏥' },
      { id: 2, name: '外科', icon: '⚕️' },
      { id: 3, name: '儿科', icon: '👶' },
      { id: 4, name: '妇产科', icon: '👩' },
      { id: 5, name: '眼科', icon: '👁️' },
      { id: 6, name: '口腔科', icon: '🦷' }
    ]

    const doctors = [
      {
        id: 1,
        name: '张医生',
        title: '主任医师',
        department: '内科',
        specialty: '消化系统疾病、呼吸系统疾病',
        avatar: 'https://example.com/doctor1.jpg',
        consultCount: 1234,
        rating: 98,
        price: 100
      },
      // ... 更多医生数据
    ]

    const consultationRecords = [
      {
        id: 1,
        doctorName: '张医生',
        doctorAvatar: 'https://example.com/doctor1.jpg',
        department: '内科',
        status: 'completed',
        statusText: '已完成',
        time: Date.now() - 86400000,
        description: '感冒发烧，咳嗽'
      },
      // ... 更多问诊记录
    ]

    // 处理症状选择
    const handleSymptomSelect = (symptom) => {
      selectedSymptom.value = symptom
      showConsultForm.value = true
    }

    // 处理科室选择
    const handleDepartmentSelect = (department) => {
      selectedDepartment.value = department
      showConsultForm.value = true
    }

    // 处理医生选择
    const handleDoctorSelect = (doctor) => {
      selectedDoctor.value = doctor
      showConsultForm.value = true
    }

    // 处理问诊记录详情
    const handleRecordDetail = (record) => {
      router.push({
        name: 'ConsultationDetail',
        params: { id: record.id }
      })
    }

    // 处理问诊表单提交
    const handleConsultSubmit = async (formData) => {
      try {
        // 实际项目中这里需要调用API
        const consultationId = Date.now().toString()
        showConsultForm.value = false
        
        // 跳转到聊天页面
        router.push({
          name: 'Chat',
          params: { id: consultationId }
        })
      } catch (error) {
        console.error('创建问诊失败:', error)
      }
    }

    return {
      currentTab,
      tabs,
      commonSymptoms,
      departments,
      doctors,
      consultationRecords,
      showConsultForm,
      selectedDepartment,
      selectedSymptom,
      selectedDoctor,
      handleSymptomSelect,
      handleDepartmentSelect,
      handleDoctorSelect,
      handleRecordDetail,
      handleConsultSubmit,
      formatTime
    }
  }
})
</script>

<style scoped lang="scss">
.consultation {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: white;
  padding: 15px;
  
  h1 {
    font-size: 18px;
    margin: 0 0 15px;
  }
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    
    &.active {
      color: $primary-color;
      border-bottom: 2px solid $primary-color;
    }
  }
}

.content {
  padding: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 15px;
}

.symptoms-grid,
.departments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.symptom-item,
.department-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  
  .icon {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
  }
}

.doctor-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  
  .info {
    flex: 1;
    
    .name {
      font-size: 16px;
      font-weight: bold;
      
      .title {
        font-size: 12px;
        color: #666;
        margin-left: 8px;
      }
    }
    
    .department {
      font-size: 14px;
      color: #666;
      margin: 4px 0;
    }
    
    .specialty {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }
  }
  
  .stats {
    display: flex;
    gap: 15px;
    
    .stat-item {
      .label {
        font-size: 12px;
        color: #999;
      }
      
      .value {
        color: $primary-color;
        margin-left: 4px;
      }
    }
  }
  
  .action {
    text-align: right;
    
    .price {
      color: #f56c6c;
      font-size: 18px;
      margin-bottom: 8px;
    }
    
    .consult-btn {
      padding: 6px 12px;
      background: $primary-color;
      color: white;
      border-radius: 4px;
    }
  }
}

.record-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  
  .doctor-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .info {
      flex: 1;
      
      .name {
        font-weight: bold;
      }
      
      .department {
        font-size: 12px;
        color: #666;
      }
    }
    
    .status {
      font-size: 12px;
      
      &.completed {
        color: $success-color;
      }
      
      &.ongoing {
        color: $primary-color;
      }
      
      &.cancelled {
        color: $danger-color;
      }
    }
  }
  
  .consultation-info {
    .time {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }
    
    .description {
      color: #666;
    }
  }
}
</style>
