<template>
  <div class="container">
    <div class="contact-main">
      <h1 class="page-title">{{ $t('contact.title') }}</h1>
      <div class="contact-card">
        <div v-if="successMessage" class="success-message">
          <span>{{ successMessage }}</span>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label" for="name">{{ $t('contact.form.name') }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              class="form-input" 
              required
              :placeholder="$t('contact.form.name.placeholder')"
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="email">{{ $t('contact.form.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              class="form-input" 
              required
              :placeholder="$t('contact.form.email.placeholder')"
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="subject">{{ $t('contact.form.subject') }}</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              class="form-input" 
              required
              :placeholder="$t('contact.form.subject.placeholder')"
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="message">{{ $t('contact.form.message') }}</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              class="form-input" 
              required
              :placeholder="$t('contact.form.message.placeholder')"
            ></textarea>
          </div>
          <button type="submit" class="submit-button" :disabled="loading">
            {{ loading ? $t('contact.sending') : $t('contact.form.submit') }}
          </button>
        </form>
        <div class="contact-info">
          <span>{{ $t('contact.info') }}</span><br>
          <b v-html="$t('contact.info.email')"></b> <a href="mailto:ehc28260@gmail.com">ehc28260@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '../utils/api'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const successMessage = ref('')

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const response = await api.post('/api/contact', form)
    successMessage.value = '문의가 성공적으로 전송되었습니다.'
    // 폼 초기화
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
  } catch (error) {
    console.error('문의 전송 실패:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.contact-main {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 32px;
  border: 1px solid #edf2f7;
}

.success-message {
  background: #ebf7ed;
  color: #276749;
  border: 1px solid #c6f6d5;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.success-message::before {
  content: "✓";
  font-weight: bold;
  margin-right: 12px;
  background: #48bb78;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2c3e50;
  transition: all 0.2s ease;
  background: #f8fafc;
  font-family: 'Noto Sans KR', sans-serif;
}

.form-input::placeholder {
  color: #a0aec0;
  font-family: 'Noto Sans KR', sans-serif;
}

.form-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  background: white;
}

textarea.form-input {
  min-height: 120px;
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background: #34495e;
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-info {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #edf2f7;
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: 'Noto Sans KR', sans-serif;
}

.contact-info a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.contact-info a:hover {
  color: #2c5282;
}

.contact-info b {
  color: #2c3e50;
  font-weight: 600;
}

/* 다크모드 지원 */
.dark-mode .page-title {
  color: #f7fafc;
  border-bottom-color: #4a5568;
}

.dark-mode .contact-card {
  background: #2d3748;
  border-color: #4a5568;
}

.dark-mode .form-label {
  color: #e2e8f0;
}

.dark-mode .form-input {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .form-input:focus {
  border-color: #63b3ed;
  background: #2d3748;
}

.dark-mode .submit-button {
  background: #63b3ed;
}

.dark-mode .submit-button:hover:not(:disabled) {
  background: #4299e1;
}

.dark-mode .contact-info {
  border-top-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .contact-info b {
  color: #f7fafc;
}

.dark-mode .contact-info a {
  color: #63b3ed;
}

.dark-mode .contact-info a:hover {
  color: #90cdf4;
}

.dark-mode .success-message {
  background: #1c4532;
  border-color: #276749;
  color: #9ae6b4;
}
</style> 