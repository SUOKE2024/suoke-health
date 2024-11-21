<template>
  <div class="register-page">
    <div class="header">
      <div class="back" @click="router.back()">
        <i class="icon">←</i>
      </div>
      <h1>注册账号</h1>
    </div>

    <div class="content">
      <div class="register-form">
        <!-- 手机号 -->
        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">📱</i>
            <input 
              v-model="form.phone"
              type="tel"
              placeholder="请输入手机号"
              maxlength="11"
            >
          </div>
        </div>

        <!-- 验证码 -->
        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">🔑</i>
            <input 
              v-model="form.code"
              type="tel"
              placeholder="请输入验证码"
              maxlength="6"
            >
            <SkButton 
              class="code-btn"
              :disabled="!canSendCode"
              :loading="sending"
              @click="handleSendCode"
            >
              {{ codeText }}
            </SkButton>
          </div>
        </div>

        <!-- 密码 -->
        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">🔒</i>
            <input 
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请设置密码"
            >
            <i 
              class="icon clickable"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </i>
          </div>
          <div class="tip">密码需包含字母和数字，长度8-20位</div>
        </div>

        <!-- 确认密码 -->
        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">🔒</i>
            <input 
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请确认密码"
            >
          </div>
        </div>

        <!-- 用户协议 -->
        <div class="form-item">
          <div class="agreement">
            <SkCheckbox v-model="form.agreed">
              我已阅读并同意
              <a href="#" @click.prevent="showAgreement = true">《用户协议》</a>
              和
              <a href="#" @click.prevent="showPrivacy = true">《隐私政策》</a>
            </SkCheckbox>
          </div>
        </div>

        <!-- 注册按钮 -->
        <div class="form-item">
          <SkButton 
            type="primary" 
            block 
            :loading="loading"
            :disabled="!canSubmit"
            @click="handleRegister"
          >
            注册
          </SkButton>
        </div>
      </div>
    </div>

    <!-- 协议弹窗 -->
    <SkDialog
      v-model:visible="showAgreement"
      title="用户协议"
      width="90%"
    >
      <div class="agreement-content">
        <!-- 协议内容 -->
      </div>
    </SkDialog>

    <SkDialog
      v-model:visible="showPrivacy"
      title="隐私政策"
      width="90%"
    >
      <div class="agreement-content">
        <!-- 隐私政策内容 -->
      </div>
    </SkDialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { register, sendCode } from '@/api/auth'

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    const form = ref({
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      agreed: false
    })
    
    const loading = ref(false)
    const sending = ref(false)
    const countdown = ref(0)
    const showPassword = ref(false)
    const showAgreement = ref(false)
    const showPrivacy = ref(false)

    // 验证码倒计时文本
    const codeText = computed(() => {
      if (countdown.value > 0) {
        return `${countdown.value}s`
      }
      return '获取验证码'
    })

    // 是否可以发送验证码
    const canSendCode = computed(() => {
      return /^1\d{10}$/.test(form.value.phone) && countdown.value === 0
    })

    // 是否可以提交注册
    const canSubmit = computed(() => {
      return form.value.phone &&
        form.value.code &&
        form.value.password &&
        form.value.confirmPassword &&
        form.value.password === form.value.confirmPassword &&
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(form.value.password) &&
        form.value.agreed
    })

    // 发送验证码
    const handleSendCode = async () => {
      if (!canSendCode.value) return
      
      try {
        sending.value = true
        await sendCode(form.value.phone)
        
        countdown.value = 60
        const timer = setInterval(() => {
          countdown.value--
          if (countdown.value <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      } catch (error) {
        console.error('发送验证码失败:', error)
      } finally {
        sending.value = false
      }
    }

    // 注册
    const handleRegister = async () => {
      if (!canSubmit.value) return
      
      try {
        loading.value = true
        const data = await register({
          phone: form.value.phone,
          code: form.value.code,
          password: form.value.password
        })
        
        // 注册成功后自动登录
        await userStore.setToken(data.token)
        await userStore.getUserInfo()
        
        router.replace('/')
      } catch (error) {
        console.error('注册失败:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      router,
      form,
      loading,
      sending,
      countdown,
      showPassword,
      showAgreement,
      showPrivacy,
      codeText,
      canSendCode,
      canSubmit,
      handleSendCode,
      handleRegister
    }
  }
})
</script>

<style scoped lang="scss">
.register-page {
  min-height: 100vh;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  
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

// 其他样式与登录页面相同，这里省略...
</style>
