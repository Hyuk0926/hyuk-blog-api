<template>
  <div class="admin-login-page">
    <div class="admin-login-container">
      <div class="admin-login-header">
        <h1 class="admin-login-title">{{ $t('admin.login.title') }}</h1>
        <p class="admin-login-subtitle">{{ $t('admin.login.subtitle') }}</p>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="form-label">{{ $t('admin.login.username') }}</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            class="form-input" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">{{ $t('admin.login.password') }}</label>
          <div style="position:relative;">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password" 
              class="form-input" 
              required 
              autocomplete="current-password"
              style="padding-right:40px; ime-mode:disabled;"
            >
            <span 
              @click="togglePassword" 
              title="비밀번호 보기" 
              style="position:absolute; right:12px; top:50%; transform:translateY(-50%); cursor:pointer; font-size:1.3rem; color:#888;"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
          <div v-if="capsLockOn" class="caps-lock-warning">
            CapsLock이 켜져 있습니다!
          </div>
        </div>
        
        <button type="submit" class="admin-login-button" :disabled="loading">
          {{ loading ? $t('admin.login.loggingIn') : $t('admin.login.button') }}
        </button>
      </form>
      
      <div class="back-link">
        <router-link to="/">← {{ $t('admin.login.backToMain') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: ''
})

const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const capsLockOn = ref(false)

const handleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await userStore.adminLogin(form.username, form.password)
    
    if (result.success) {
      router.push('/admin/dashboard')
    }
  } catch (err) {
    error.value = err.response?.data?.error || '관리자 로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const checkCapsLock = (event) => {
  capsLockOn.value = event.getModifierState('CapsLock')
}

onMounted(() => {
  // CapsLock 감지
  document.addEventListener('keydown', checkCapsLock)
  document.addEventListener('keyup', checkCapsLock)
})
</script>

<style scoped>
.admin-login-page {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #404040 50%, #2d2d2d 75%, #1a1a1a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.admin-login-container {
  background: rgba(45, 45, 45, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.admin-login-header {
  text-align: center;
  margin-bottom: 32px;
}

.admin-login-title {
  font-size: 1.75rem;
  color: #ffffff;
  margin-bottom: 8px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
}

.admin-login-subtitle {
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

.admin-login-button {
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

.admin-login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  background: linear-gradient(145deg, #777777 0%, #555555 100%);
}

.admin-login-button:active {
  transform: translateY(0);
}

.admin-login-button:disabled {
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

.back-link {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

.caps-lock-warning {
  color: #dc3545;
  font-size: 0.95rem;
  margin-top: 6px;
}

/* 다크모드 지원 */
.dark-mode .admin-login-page {
  background: #1a202c;
}

.dark-mode .admin-login-container {
  background: #2d3748;
  border-color: #4a5568;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.dark-mode .admin-login-title {
  color: #f7fafc;
}

.dark-mode .admin-login-subtitle {
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

.dark-mode .back-link {
  border-top-color: #4a5568;
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