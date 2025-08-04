<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 로그인 관련 페이지들에서 Header와 Footer 숨기기
const isLoginPage = computed(() => {
  return route.path.includes('/user/login') || 
         route.path.includes('/user/register') || 
         route.path.includes('/admin/login')
})

// 라우트 변경 감지하여 Home 페이지가 아닐 때는 body 배경 초기화
watch(() => route.path, (newPath) => {
  if (newPath !== '/home') {
    document.body.style.backgroundImage = 'none'
    document.body.style.background = ''
  }
})
</script>

<template>
  <div id="app">
    <Header v-if="!isLoginPage" />
    <main>
      <router-view />
    </main>
    <Footer v-if="!isLoginPage && $route.path !== '/home'" />
  </div>
</template>

<style>
/* 전역 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* 커서 스타일 */
.custom-cursor {
  cursor: url('/cursor/pointer.cur'), pointer;
}

/* 다크모드 지원 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}
</style>
