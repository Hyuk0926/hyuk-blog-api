<template>
  <div class="home-container">
    <div class="home-title">{{ $t('home.title') }}</div>
    <div class="home-subtitle">{{ $t('home.subtitle') }}</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 페이지 로드 시 배경 이미지 설정
  document.body.style.backgroundImage = "url('/img/light_mode_bg.jpg')"
  document.body.style.backgroundSize = "cover"
  document.body.style.backgroundPosition = "center"
  document.body.style.backgroundRepeat = "no-repeat"
  document.body.style.backgroundAttachment = "fixed"
  
  // 다크모드 감지 및 배경 변경
  const isDarkMode = document.body.classList.contains('dark-mode')
  if (isDarkMode) {
    document.body.style.backgroundImage = "url('/img/dark_mode_bg.jpg')"
  }
  
  // 다크모드 변경 감지
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const isDark = document.body.classList.contains('dark-mode')
        if (isDark) {
          document.body.style.backgroundImage = "url('/img/dark_mode_bg.jpg')"
        } else {
          document.body.style.backgroundImage = "url('/img/light_mode_bg.jpg')"
        }
      }
    })
  })
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<style scoped>
.home-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 200px);
}

.home-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 18px;
  letter-spacing: 2px;
  transition: color 0.5s ease;
}

.home-subtitle {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 40px;
  transition: color 0.5s ease;
}

/* 다크모드 */
.dark-mode .home-title {
  color: #fff;
}

.dark-mode .home-subtitle {
  color: #e0e0e0;
}

@media (max-width: 600px) {
  .home-title { 
    font-size: 2rem; 
  }
}
</style> 