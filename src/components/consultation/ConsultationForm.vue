<template>
  <div class="consultation-form">
    <!-- 基本信息 -->
    <div class="form-section">
      <div class="section-title">就诊人信息</div>
      <div class="form-item">
        <label>就诊人</label>
        <div class="patient-selector">
          <div 
            v-for="patient in patients" 
            :key="patient.id"
            class="patient-item"
            :class="{ active: selectedPatient?.id === patient.id }"
            @click="selectedPatient = patient"
          >
            <div class="name">{{ patient.name }}</div>
            <div class="info">{{ patient.gender }} {{ patient.age }}岁</div>
          </div>
          <div class="patient-item add" @click="showAddPatient = true">
            <i class="icon">+</i>
            <span>添加就诊人</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 问诊信息 -->
    <div class="form-section">
      <div class="section-title">问诊信息</div>
      
      <div class="form-item">
        <label>就诊科室</label>
        <div class="value">{{ department?.name || '请选择科室' }}</div>
      </div>

      <div class="form-item">
        <label>症状描述</label>
        <textarea 
          v-model="description"
          placeholder="请详细描述您的症状、发病时间、持续时间等..."
          :rows="4"
        ></textarea>
      </div>

      <div class="form-item">
        <label>图片资料</label>
        <div class="image-uploader">
          <div 
            v-for="(img, index) in images" 
            :key="index"
            class="image-item"
          >
            <img :src="img" alt="症状图片">
            <div class="delete" @click="handleImageDelete(index)">×</div>
          </div>
          <div 
            v-if="images.length < 4"
            class="image-item upload"
            @click="handleImageUpload"
          >
            <i class="icon">+</i>
            <div class="text">上传图片</div>
          </div>
        </div>
        <div class="tip">最多上传4张图片，每张不超过5MB</div>
      </div>

      <div class="form-item">
        <label>既往病史</label>
        <div class="checkbox-group">
          <SkCheckbox
            v-for="item in medicalHistory"
            :key="item.value"
            v-model="selectedHistory"
            :label="item.label"
            :value="item.value"
          />
        </div>
        <textarea
          v-model="historyDetail"
          placeholder="可补充详细说明..."
          :rows="2"
        ></textarea>
      </div>

      <div class="form-item">
        <label>过敏史</label>
        <div class="checkbox-group">
          <SkCheckbox
            v-for="item in allergies"
            :key="item.value"
            v-model="selectedAllergies"
            :label="item.label"
            :value="item.value"
          />
        </div>
        <textarea
          v-model="allergyDetail"
          placeholder="可补充详细说明..."
          :rows="2"
        ></textarea>
      </div>
    </div>

    <!-- 问诊须知 -->
    <div class="form-section">
      <div class="section-title">问诊须知</div>
      <div class="notice">
        <p>1. 在线问诊仅适用于常见病、慢性病复诊。</p>
        <p>2. 如出现急危重症状，请立即就医。</p>
        <p>3. 医生会在24小时内回复，请耐心等待。</p>
      </div>
      <div class="agreement">
        <SkCheckbox v-model="agreed">
          我已阅读并同意
          <a href="#" @click.prevent="showAgreement = true">《在线问诊服务协议》</a>
        </SkCheckbox>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="form-footer">
      <div class="price" v-if="doctor">
        <span class="label">问诊费：</span>
        <span class="amount">￥{{ doctor.price }}</span>
      </div>
      <SkButton
        type="primary"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        立即问诊
      </SkButton>
    </div>

    <!-- 添加就诊人弹窗 -->
    <SkDialog
      v-model:visible="showAddPatient"
      title="添加就诊人"
      width="90%"
    >
      <PatientForm
        @submit="handleAddPatient"
        @cancel="showAddPatient = false"
      />
    </SkDialog>

    <!-- 服务协议弹窗 -->
    <SkDialog
      v-model:visible="showAgreement"
      title="在线问诊服务协议"
      width="90%"
    >
      <div class="agreement-content">
        <!-- 协议内容 -->
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import PatientForm from './PatientForm.vue'

export default defineComponent({
  name: 'ConsultationForm',
  components: {
    PatientForm
  },
  props: {
    department: {
      type: Object,
      default: null
    },
    symptom: {
      type: Object,
      default: null
    },
    doctor: {
      type: Object,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    // 就诊人相关
    const patients = ref([
      {
        id: 1,
        name: '张三',
        gender: '男',
        age: 28
      }
    ])
    const selectedPatient = ref(null)
    const showAddPatient = ref(false)

    // 表单数据
    const description = ref('')
    const images = ref([])
    const selectedHistory = ref([])
    const historyDetail = ref('')
    const selectedAllergies = ref([])
    const allergyDetail = ref('')
    const agreed = ref(false)
    const showAgreement = ref(false)

    // 选项数据
    const medicalHistory = [
      { label: '高血压', value: 'hypertension' },
      { label: '糖尿病', value: 'diabetes' },
      { label: '心脏病', value: 'heart_disease' },
      { label: '肝病', value: 'liver_disease' },
      { label: '其他', value: 'other' }
    ]

    const allergies = [
      { label: '药物过敏', value: 'drug' },
      { label: '食物过敏', value: 'food' },
      { label: '无过敏史', value: 'none' }
    ]

    // 处理图片上传
    const handleImageUpload = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (file) {
          try {
            // 实际项目中这里需要调用API上传图片
            const imageUrl = URL.createObjectURL(file)
            images.value.push(imageUrl)
          } catch (error) {
            console.error('上传图片失败:', error)
          }
        }
      }
      input.click()
    }

    // 删除图片
    const handleImageDelete = (index) => {
      images.value.splice(index, 1)
    }

    // 添加就诊人
    const handleAddPatient = (patient) => {
      patients.value.push({
        id: Date.now(),
        ...patient
      })
      showAddPatient.value = false
    }

    // 是否可提交
    const canSubmit = computed(() => {
      return selectedPatient.value &&
        description.value.trim() &&
        agreed.value
    })

    // 提交表单
    const handleSubmit = () => {
      if (!canSubmit.value) return

      const formData = {
        patientId: selectedPatient.value.id,
        departmentId: props.department?.id,
        doctorId: props.doctor?.id,
        description: description.value,
        images: images.value,
        medicalHistory: {
          items: selectedHistory.value,
          detail: historyDetail.value
        },
        allergies: {
          items: selectedAllergies.value,
          detail: allergyDetail.value
        }
      }

      emit('submit', formData)
    }

    return {
      // 数据
      patients,
      selectedPatient,
      description,
      images,
      selectedHistory,
      historyDetail,
      selectedAllergies,
      allergyDetail,
      agreed,
      medicalHistory,
      allergies,
      
      // 弹窗控制
      showAddPatient,
      showAgreement,
      
      // 计算属性
      canSubmit,
      
      // 方法
      handleImageUpload,
      handleImageDelete,
      handleAddPatient,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.consultation-form {
  padding: 15px;
}

.form-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}

.form-item {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #666;
  }

  .value {
    color: #333;
  }

  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;

    &:focus {
      border-color: $primary-color;
    }
  }
}

.patient-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.patient-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;

  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.05);
  }

  &.add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;

    .icon {
      font-size: 24px;
      margin-bottom: 4px;
    }
  }

  .name {
    font-weight: bold;
  }

  .info {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }
}

.image-uploader {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #999;

    .icon {
      font-size: 24px;
      margin-bottom: 4px;
    }

    .text {
      font-size: 12px;
    }
  }

  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

.notice {
  color: #666;
  font-size: 14px;
  line-height: 1.6;

  p {
    margin: 0 0 8px;
  }
}

.agreement {
  margin-top: 15px;
  
  a {
    color: $primary-color;
  }
}

.form-footer {
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

  .price {
    .label {
      color: #666;
    }

    .amount {
      color: #f56c6c;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.agreement-content {
  max-height: 60vh;
  overflow-y: auto;
  padding: 15px;
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}
</style>
