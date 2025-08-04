<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <h1 class="register-title">{{ $t('user.register.title') }}</h1>
        <p class="register-subtitle">{{ $t('user.register.subtitle') }}</p>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username" class="form-label">{{ $t('user.register.username') }}</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            class="form-input" 
            required
            @blur="checkUsernameAvailability"
          >
          <div v-if="usernameMessage" class="validation-message" :class="usernameAvailable ? 'success' : 'error'">
            {{ usernameMessage }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="nickname" class="form-label">{{ $t('user.register.nickname') }}</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="form.nickname" 
            class="form-input" 
            required
            @blur="checkNicknameAvailability"
          >
          <div v-if="nicknameMessage" class="validation-message" :class="nicknameAvailable ? 'success' : 'error'">
            {{ nicknameMessage }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="form-label">{{ $t('user.register.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            class="form-input" 
            required
            @blur="checkEmailAvailability"
          >
          <div v-if="emailMessage" class="validation-message" :class="emailAvailable ? 'success' : 'error'">
            {{ emailMessage }}
          </div>
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">{{ $t('user.register.password') }}</label>
          <div style="position:relative;">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password" 
              class="form-input" 
              required 
              autocomplete="new-password"
              style="padding-right:40px; ime-mode:disabled;"
            >
            <span 
              @click="togglePassword" 
              title="비밀번호 보기" 
              style="position:absolute; right:12px; top:50%; transform:translateY(-50%); cursor:pointer; font-size:1.3rem; color:#888;"
            >
              {{ $t('user.login.eye') }}
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword" class="form-label">{{ $t('user.register.confirmPassword') }}</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            class="form-input" 
            required
            style="ime-mode:disabled;"
          >
          <div v-if="passwordMessage" class="validation-message error">
            {{ passwordMessage }}
          </div>
        </div>
        
        <button type="submit" class="register-button" :disabled="loading || !isFormValid">
          {{ loading ? $t('user.register.registering') : $t('user.register.button') }}
        </button>
      </form>
      
      <div class="login-link">
        <p>
          <span>{{ $t('user.account.exists') }}</span> 
          <router-link to="/user/login">{{ $t('user.login.link') }}</router-link>
        </p>
      </div>
      
      <div class="back-link">
        <router-link to="/">← {{ $t('user.register.back.to.main') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import api from '../../utils/api'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const capsLockOn = ref(false)

// 유효성 검사 상태
const usernameAvailable = ref(false)
const nicknameAvailable = ref(false)
const emailAvailable = ref(false)
const usernameMessage = ref('')
const nicknameMessage = ref('')
const emailMessage = ref('')
const passwordMessage = ref('')

const isFormValid = computed(() => {
  return form.username && form.nickname && form.email && form.password && form.confirmPassword &&
         usernameAvailable.value && nicknameAvailable.value && emailAvailable.value &&
         form.password === form.confirmPassword
})

const handleRegister = async () => {
  if (loading.value || !isFormValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await userStore.register(form)
    
    if (result.success) {
      router.push({ 
        path: '/user/login', 
        query: { message: '회원가입이 완료되었습니다! 로그인해주세요.' }
      })
    }
  } catch (err) {
    error.value = err.response?.data?.error || '회원가입에 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const checkUsernameAvailability = async () => {
  if (!form.username) {
    usernameMessage.value = ''
    usernameAvailable.value = false
    return
  }
  
  try {
    const response = await api.post('/user/check-username', { username: form.username })
    usernameAvailable.value = response.data
    usernameMessage.value = response.data ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'
  } catch (err) {
    usernameMessage.value = '아이디 확인 중 오류가 발생했습니다.'
    usernameAvailable.value = false
  }
}

const checkNicknameAvailability = async () => {
  if (!form.nickname) {
    nicknameMessage.value = ''
    nicknameAvailable.value = false
    return
  }
  
  try {
    const response = await api.post('/user/check-nickname', { nickname: form.nickname })
    nicknameAvailable.value = response.data
    nicknameMessage.value = response.data ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'
  } catch (err) {
    nicknameMessage.value = '닉네임 확인 중 오류가 발생했습니다.'
    nicknameAvailable.value = false
  }
}

const checkEmailAvailability = async () => {
  if (!form.email) {
    emailMessage.value = ''
    emailAvailable.value = false
    return
  }
  
  try {
    const response = await api.post('/user/check-email', { email: form.email })
    emailAvailable.value = response.data
    emailMessage.value = response.data ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'
  } catch (err) {
    emailMessage.value = '이메일 확인 중 오류가 발생했습니다.'
    emailAvailable.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const checkCapsLock = (event) => {
  capsLockOn.value = event.getModifierState('CapsLock')
}

const validatePassword = () => {
  if (!form.password) {
    passwordMessage.value = ''
    return
  }
  
  if (form.password !== form.confirmPassword) {
    passwordMessage.value = '비밀번호가 일치하지 않습니다.'
  } else {
    passwordMessage.value = ''
  }
}

onMounted(() => {
  // CapsLock 감지
  document.addEventListener('keydown', checkCapsLock)
  document.addEventListener('keyup', checkCapsLock)
  
  // 비밀번호 확인 실시간 검증
  const passwordInput = document.getElementById('password')
  const confirmPasswordInput = document.getElementById('confirmPassword')
  
  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener('input', validatePassword)
    confirmPasswordInput.addEventListener('input', validatePassword)
  }
})
</script>

<style scoped>
.register-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #404040 50%, #2d2d2d 75%, #1a1a1a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.register-container {
  background: rgba(45, 45, 45, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-title {
  font-size: 1.75rem;
  color: #ffffff;
  margin-bottom: 8px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
}

.register-subtitle {
  color: #b0b0b0;
  font-size: 0.95rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #e0e0e0;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #555555;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: rgba(60, 60, 60, 0.8);
  font-family: inherit;
  color: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: #888888;
  box-shadow: 0 0 0 3px rgba(136, 136, 136, 0.2);
  transform: translateY(-1px);
  background: rgba(70, 70, 70, 0.9);
}

.register-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(145deg, #666666 0%, #444444 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  background: linear-gradient(145deg, #777777 0%, #555555 100%);
}

.register-button:active {
  transform: translateY(0);
}

.register-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: rgba(197, 48, 48, 0.2);
  color: #ff6b6b;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(197, 48, 48, 0.3);
}

.validation-message {
  font-size: 0.85rem;
  margin-top: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}

.validation-message.success {
  background: rgba(47, 133, 90, 0.2);
  color: #68d391;
  border: 1px solid rgba(47, 133, 90, 0.3);
}

.validation-message.error {
  background: rgba(197, 48, 48, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(197, 48, 48, 0.3);
}

.login-link {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.login-link a {
  color: #cccccc;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.back-link {
  text-align: center;
  margin-top: 16px;
}

.back-link a {
  color: #aaaaaa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.back-link a:hover {
  color: #cccccc;
  text-decoration: underline;
}

/* 다크모드 지원 */
.dark-mode .register-page {
  background: #1a202c;
}

.dark-mode .register-container {
  background: #2d3748;
  border-color: #4a5568;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.dark-mode .register-title {
  color: #f7fafc;
}

.dark-mode .register-subtitle {
  color: #a0aec0;
}

.dark-mode .form-label {
  color: #e2e8f0;
}

.dark-mode .form-input {
  background: #1a202c;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .form-input:focus {
  border-color: #ffe082;
  box-shadow: 0 0 0 3px rgba(255, 224, 130, 0.1);
}

.dark-mode .login-link {
  border-top-color: #4a5568;
}

.dark-mode .login-link a {
  color: #90cdf4;
}

.dark-mode .login-link a:hover {
  color: #63b3ed;
}

.dark-mode .back-link a {
  color: #a0aec0;
}

.dark-mode .back-link a:hover {
  color: #e2e8f0;
}

/* 비밀번호 토글 아이콘 다크모드 */
.dark-mode #togglePassword {
  color: #a0aec0;
}

.dark-mode #togglePassword:hover {
  color: #e2e8f0;
}

/* 비밀번호 토글 아이콘 호버 효과 */
#togglePassword:hover {
  color: #ffffff !important;
  transform: scale(1.1);
  transition: all 0.2s ease;
}
</style> 