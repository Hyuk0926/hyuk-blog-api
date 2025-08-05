<template>
  <header class="navbar">
    <div class="container header-flex">
      <router-link class="navbar-brand" :to="{ path: '/', query: { lang: currentLang } }">
        {{ $t('header.title') }}
      </router-link>
      <div class="header-right">
        <nav>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/home', query: { lang: currentLang } }">
                {{ $t('header.nav.home') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/', query: { lang: currentLang } }">
                {{ $t('header.nav.knowledge') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/projects', query: { lang: currentLang } }">
                {{ $t('header.nav.projects') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/about', query: { lang: currentLang } }">
                {{ $t('header.nav.resume') }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ path: '/contact', query: { lang: currentLang } }">
                {{ $t('header.nav.contact') }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="header-controls">
          <!-- 사용자 인증 상태에 따른 로그인/로그아웃 버튼 -->
          <div class="auth-controls" v-if="user">
            <span class="user-info">{{ user.nickname }}{{ currentLang === 'ja' ? 'さん' : '님' }}</span>
            <button @click="logout" class="auth-btn logout-btn">{{ $t('user.logout') }}</button>
          </div>
          <div class="auth-controls" v-else>
            <router-link to="/user/login" class="auth-btn login-btn">{{ $t('user.login_link') }}</router-link>
            <router-link to="/user/register" class="auth-btn register-btn">{{ $t('user.register_link') }}</router-link>
          </div>
          
          <button @click="toggleDarkMode" class="control-btn dark-mode-btn" :title="$t('darkMode.toggle')">
            <span class="dark-icon" v-show="!isDarkMode">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
              </svg>
            </span>
            <span class="light-icon" v-show="isDarkMode">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </span>
          </button>
          
          <div class="lang-toggle">
            <button 
              @click="changeLanguage('ko')"
              class="lang-btn post-lang-toggle"
              :class="{ active: currentLang === 'ko' }"
            >
              KO
            </button>
            <span class="lang-separator">|</span>
            <button 
              @click="changeLanguage('ja')"
              class="lang-btn post-lang-toggle"
              :class="{ active: currentLang === 'ja' }"
            >
              JP
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const userStore = useUserStore()

const isDarkMode = ref(false)
const user = computed(() => userStore.user)
const currentLang = computed(() => locale.value)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  setDarkMode(isDarkMode.value)
}

const setDarkMode = (enabled) => {
  if (enabled) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('darkMode', 'false')
  }
}

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  
  // 현재 라우트에 언어 파라미터 추가
  const newQuery = { ...route.query, lang }
  router.push({ path: route.path, query: newQuery }).catch(() => {
    // 라우터 오류 무시
  })
}

const logout = async () => {
  try {
    await userStore.logout()
    router.push('/')
  } catch (error) {
    console.error('로그아웃 실패:', error)
  }
}

onMounted(() => {
  // 다크모드 초기화
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = savedDarkMode
  setDarkMode(savedDarkMode)
})
</script>

<style scoped>
/* Base Header Styles */
.navbar {
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 0;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid #e2e8f0;
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-brand:hover {
  color: #1a202c;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-link:hover, .nav-link:focus {
  color: #1a202c;
  border-bottom-color: #2c3e50;
}

/* Header Controls (Auth, Dark Mode, Lang) */
.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.auth-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info {
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.auth-btn {
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-btn {
  color: #4a5568;
  background: #f1f5f9;
}

.login-btn:hover {
  background: #e2e8f0;
  color: #1a202c;
}

.register-btn {
  color: #ffffff;
  background: #667eea;
}

.register-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.logout-btn {
  color: #dc3545;
  background: #fee;
}

.logout-btn:hover {
  background: #fcc;
  color: #c82333;
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
}

.control-btn:hover {
  background-color: #f1f5f9;
}

.dark-mode-btn {
  width: 40px;
  height: 40px;
}

.lang-toggle {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 20px;
  padding: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.lang-btn {
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4a5568;
}

.lang-btn.active {
  background: #ffffff;
  color: #1a202c;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.lang-separator {
  color: #cbd5e1;
  margin: 0 2px;
}

/* Dark Mode Styles */
.dark-mode .navbar {
  background: #1a202c;
  border-bottom-color: #2d3748;
}

.dark-mode .navbar-brand {
  color: #e2e8f0;
}

.dark-mode .navbar-brand:hover {
  color: #f0f0f0ee;
}

.dark-mode .nav-link {
  color: #a0aec0;
}

.dark-mode .nav-link:hover,
.dark-mode .nav-link:focus {
  color: #e2e8f0;
  border-bottom-color: #63b3ed;
}

.dark-mode .control-btn {
  color: #a0aec0;
}

.dark-mode .control-btn:hover {
  background-color: #2d3748;
}

.dark-mode .lang-toggle {
  background: #2d3748;
}

.dark-mode .lang-btn {
  color: #a0aec0;
}

.dark-mode .lang-btn.active {
  background: #1a202c;
  color: #e2e8f0;
}

.dark-mode .lang-separator {
  color: #4a5568;
}

.dark-mode .light-icon svg {
  stroke: #e2e8f0;
}

.dark-mode .user-info {
  color: #a0aec0;
}

.dark-mode .login-btn {
  color: #a0aec0;
  background: #2d3748;
}

.dark-mode .login-btn:hover {
  background: #4a5568;
  color: #e2e8f0;
}

.dark-mode .register-btn {
  color: #ffffff;
  background: #667eea;
}

.dark-mode .register-btn:hover {
  background: #5a67d8;
}

.dark-mode .logout-btn {
  color: #f56565;
  background: #742a2a;
}

.dark-mode .logout-btn:hover {
  background: #9b2c2c;
  color: #fed7d7;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    height: auto;
    padding: 12px 16px;
  }
  .header-right {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin-top: 12px;
  }
  .navbar-nav {
    gap: 16px;
    justify-content: center;
    width: 100%;
  }
}
</style> 