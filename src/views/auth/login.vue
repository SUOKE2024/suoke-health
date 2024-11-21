<template>
  <div class="login-page">
    <div class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo">
      <h1>{{ title }}</h1>
    </div>

    <div class="content">
      <!-- 登录表单 -->
      <div class="login-form" v-if="currentTab === 'password'">
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

        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">🔒</i>
            <input 
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
            >
            <i 
              class="icon clickable"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </i>
          </div>
        </div>

        <div class="form-item">
          <div class="remember-wrapper">
            <SkCheckbox v-model="form.remember">记住我</SkCheckbox>
            <span 
              class="forget-link"
              @click="currentTab = 'reset'"
            >
              忘记密码？
            </span>
          </div>
        </div>

        <div class="form-item">
          <SkButton 
            type="primary" 
            block 
            :loading="loading"
            :disabled="!canSubmit"
            @click="handleLogin"
          >
            登录
          </SkButton>
        </div>
      </div>

      <!-- 验证码登录 -->
      <div class="login-form" v-else-if="currentTab === 'code'">
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

        <div class="form-item">
          <SkButton 
            type="primary" 
            block 
            :loading="loading"
            :disabled="!canSubmitCode"
            @click="handleLoginByCode"
          >
            登录
          </SkButton>
        </div>
      </div>

      <!-- 重置密码 -->
      <div class="login-form" v-else>
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

        <div class="form-item">
          <div class="input-wrapper">
            <i class="icon">🔒</i>
            <input 
              v-model="form.newPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入新密码"
            >
            <i 
              class="icon clickable"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </i>
          </div>
        </div>

        <div class="form-item">
          <SkButton 
            type="primary" 
            block 
            :loading="loading"
            :disabled="!canSubmitReset"
            @click="handleReset"
          >
            重置密码
          </SkButton>
        </div>
      </div>

      <!-- 底部操作区 -->
      <div class="actions">
        <div class="tabs">
          <span 
            :class="{ active: currentTab === 'password' }"
            @click="currentTab = 'password'"
          >
            密码登录
          </span>
          <span 
            :class="{ active: currentTab === 'code' }"
            @click="currentTab = 'code'"
          >
            验证码登录
          </span>
        </div>
        <div class="register">
          还没有账号？
          <router-link to="/auth/register">立即注册</router-link>
        </div>
      </div>

      <!-- 第三方登录 -->
      <div class="third-party">
        <div class="divider">
          <span>其他登录方式</span>
        </div>
        <div class="third-party-btns">
          <div class="btn" @click="handleThirdParty('wechat')">
            <i class="icon">💚</i>
            <span>微信</span>
          </div>
          <div class="btn" @click="handleThirdParty('alipay')">
            <i class="icon">💙</i>
            <span>支付宝</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户协议 -->
    <div class="agreement">
      登录即代表您已同意
      <a href="#" @click.prevent="showAgreement = true">《用户协议》</a>
      和
      <a href="#" @click.prevent="showPrivacy = true">《隐私政策》</a>
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
import { login, loginByCode, sendCode, resetPassword } from '@/api/auth'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const title = import.meta.env.VITE_APP_TITLE

    // 表单数据
    const form = ref({
      phone: '',
      password: '',
      code: '',
      newPassword: '',
      remember: false
    })

    // 状态控制
    const currentTab = ref('password')
    const showPassword = ref(false)
    const loading = ref(false)
    const sending = ref(false)
    const countdown = ref(0)
    const showAgreement = ref(false)
    const showPrivacy = ref(false)

    // 验证码倒计时文本
    const codeText = computed(() => {
      if (countdown.value > 0) {
        return `${countdown.value}s后重新获取`
      }
      return '获取验证码'
    })

    // 表单验证
    const canSubmit = computed(() => {
      return form.value.phone && form.value.password
    })

    const canSubmitCode = computed(() => {
      return form.value.phone && form.value.code
    })

    const canSubmitReset = computed(() => {
      return form.value.phone && form.value.code && form.value.newPassword
    })

    const canSendCode = computed(() => {
      return form.value.phone && countdown.value === 0
    })

    // 发送验证码
    const handleSendCode = async () => {
      if (!canSendCode.value || sending.value) return
      
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

    // 密码登录
    const handleLogin = async () => {
      if (!canSubmit.value || loading.value) return
      
      try {
        loading.value = true
        const res = await login({
          phone: form.value.phone,
          password: form.value.password,
          remember: form.value.remember
        })
        
        await userStore.setUserInfo(res.user)
        await userStore.setToken(res.token)
        
        router.push('/')
      } catch (error) {
        console.error('登录失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 验证码登录
    const handleLoginByCode = async () => {
      if (!canSubmitCode.value || loading.value) return
      
      try {
        loading.value = true
        const res = await loginByCode({
          phone: form.value.phone,
          code: form.value.code
        })
        
        await userStore.setUserInfo(res.user)
        await userStore.setToken(res.token)
        
        router.push('/')
      } catch (error) {
        console.error('登录失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 重置密码
    const handleReset = async () => {
      if (!canSubmitReset.value || loading.value) return
      
      try {
        loading.value = true
        await resetPassword({
          phone: form.value.phone,
          code: form.value.code,
          password: form.value.newPassword
        })
        
        currentTab.value = 'password'
        form.value.password = form.value.newPassword
        form.value.newPassword = ''
        form.value.code = ''
      } catch (error) {
        console.error('重置密码失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 第三方登录
    const handleThirdParty = (type) => {
      // 实际项目中这里需要调用相应的第三方登录SDK
      console.log('第三方登录:', type)
    }

    return {
      title,
      form,
      currentTab,
      showPassword,
      loading,
      sending,
      countdown,
      showAgreement,
      showPrivacy,
      codeText,
      canSubmit,
      canSubmitCode,
      canSubmitReset,
      canSendCode,
      handleSendCode,
      handleLogin,
      handleLoginByCode,
      handleReset,
      handleThirdParty
    }
  }
})
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  
  .logo {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
  }
  
  h1 {
    font-size: 24px;
    color: $primary-color;
  }
}

.content {
  flex: 1;
}

.login-form {
  .form-item {
    margin-bottom: 20px;
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 44px;
  
  &:focus-within {
    border-color: $primary-color;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 8px;
    font-size: 16px;
  }
  
  .icon {
    font-size: 20px;
    
    &.clickable {
      cursor: pointer;
    }
  }
  
  .code-btn {
    min-width: 100px;
  }
}

.remember-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .forget-link {
    color: $primary-color;
    cursor: pointer;
  }
}

.actions {
  margin-top: 30px;
  
  .tabs {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 15px;
    
    span {
      color: #666;
      cursor: pointer;
      
      &.active {
        color: $primary-color;
        font-weight: bold;
      }
    }
  }
  
  .register {
    text-align: center;
    color: #666;
    
    a {
      color: $primary-color;
    }
  }
}

.third-party {
  margin-top: 40px;
  
  .divider {
    display: flex;
    align-items: center;
    color: #999;
    margin-bottom: 20px;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #eee;
    }
    
    span {
      padding: 0 15px;
    }
  }
  
  .third-party-btns {
    display: flex;
    justify-content: center;
    gap: 30px;
    
    .btn {
      text-align: center;
      cursor: pointer;
      
      .icon {
        font-size: 32px;
        margin-bottom: 8px;
      }
      
      span {
        font-size: 12px;
        color: #666;
      }
    }
  }
}

.agreement {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 30px;
  
  a {
    color: $primary-color;
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
