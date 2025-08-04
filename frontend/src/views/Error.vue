<template>
  <div class="error-container">
    <div class="container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">{{ $t('error.title') }}</h2>
        <p class="error-message">{{ $t('error.message') }}</p>
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            {{ $t('error.backToHome') }}
          </router-link>
          <button @click="goBack" class="btn btn-secondary">
            {{ $t('error.goBack') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-container {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: #007bff;
  margin: 0;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 1rem 0;
}

.error-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
  transform: translateY(-2px);
}

/* 다크모드 */
.dark-mode .error-code {
  color: #4dabf7;
}

.dark-mode .error-title {
  color: #e2e8f0;
}

.dark-mode .error-message {
  color: #a0aec0;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style> 