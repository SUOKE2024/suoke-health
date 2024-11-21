<template>
  <div class="patient-form">
    <div class="form-item">
      <label>姓名</label>
      <SkInput v-model="form.name" placeholder="请输入真实姓名" />
    </div>

    <div class="form-item">
      <label>性别</label>
      <div class="radio-group">
        <label class="radio">
          <input type="radio" v-model="form.gender" value="男">
          <span>男</span>
        </label>
        <label class="radio">
          <input type="radio" v-model="form.gender" value="女">
          <span>女</span>
        </label>
      </div>
    </div>

    <div class="form-item">
      <label>出生日期</label>
      <input 
        type="date" 
        v-model="form.birthday"
        class="date-input"
      >
    </div>

    <div class="form-item">
      <label>身份证号</label>
      <SkInput 
        v-model="form.idCard"
        placeholder="请输入身份证号"
        @input="handleIdCardInput"
      />
    </div>

    <div class="form-item">
      <label>手机号</label>
      <SkInput 
        v-model="form.phone"
        placeholder="请输入手机号"
        type="tel"
      />
    </div>

    <div class="form-item">
      <label>是否为默认就诊人</label>
      <SkCheckbox v-model="form.isDefault">设为默认</SkCheckbox>
    </div>

    <div class="form-footer">
      <SkButton @click="$emit('cancel')">取消</SkButton>
      <SkButton 
        type="primary"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        确定
      </SkButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'PatientForm',
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      gender: '男',
      birthday: '',
      idCard: '',
      phone: '',
      isDefault: false
    })

    // 根据身份证自动填充性别和生日
    const handleIdCardInput = () => {
      const idCard = form.value.idCard
      if (idCard.length >= 18) {
        // 提取出生日期
        const year = idCard.substring(6, 10)
        const month = idCard.substring(10, 12)
        const day = idCard.substring(12, 14)
        form.value.birthday = `${year}-${month}-${day}`

        // 提取性别
        const gender = parseInt(idCard.charAt(16)) % 2 === 0 ? '女' : '男'
        form.value.gender = gender
      }
    }

    // 表单验证
    const canSubmit = computed(() => {
      return form.value.name &&
        form.value.gender &&
        form.value.birthday &&
        form.value.idCard &&
        form.value.phone
    })

    const handleSubmit = () => {
      if (!canSubmit.value) return
      emit('submit', { ...form.value })
    }

    return {
      form,
      canSubmit,
      handleIdCardInput,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.patient-form {
  padding: 15px;
}

.form-item {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #666;
  }
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.date-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    border-color: $primary-color;
  }
}

.form-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
</style>
