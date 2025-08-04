<template>
  <div class="hero-section">
    <h1 class="hero-title">{{ $t('index.hero.title') }}</h1>
  </div>
  
  <div class="page-container">
    <aside class="sidebar">
      <div class="category-list-wrapper">
        <h3 class="category-list-title">{{ $t('index.category.title') }}</h3>
        <ul class="category-list">
          <li 
            class="category-item" 
            :class="{ active: selectedCategory === '' }"
            @click="selectCategory('')"
          >
            {{ $t('index.category.all') }}
          </li>
          <li 
            v-for="category in categories" 
            :key="category"
            class="category-item"
            :class="{ active: selectedCategory === category }"
            @click="selectCategory(category)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </aside>

    <main class="main-content">
      <div class="content-section">
        <div class="section-header">
          <div class="section-header-title">
            <h2 class="section-title">{{ $t('index.posts.latest') }}</h2>
            <span class="post-count">{{ filteredPosts.length }} {{ $t('index.posts.count.unit') }}</span>
          </div>
          <div class="search-form">
            <input 
              type="text" 
              v-model="searchQuery" 
              :placeholder="$t('index.search.placeholder')" 
              class="search-input"
            >
            <button type="button" class="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="post-grid" id="post-grid">
          <div v-if="filteredPosts.length === 0" class="no-posts">
            <h3>{{ $t('index.posts.empty.title') }}</h3>
            <p>{{ $t('index.posts.empty.description') }}</p>
          </div>
          
          <router-link 
            v-for="post in filteredPosts" 
            :key="post.id"
            :to="`/post/${post.id}?lang=${currentLang}`" 
            class="post-card"
          >
            <div class="post-image-wrapper">
              <img 
                v-if="post.imageUrl" 
                :src="post.imageUrl" 
                :alt="currentLang === 'ja' ? post.titleJa : post.titleKo"
                class="post-image" 
              />
              <div v-else class="post-image-placeholder">
                <span>{{ $t('index.image.none') }}</span>
              </div>
            </div>
            <div class="post-content">
              <h3 class="post-title">{{ currentLang === 'ja' ? post.titleJa : post.titleKo }}</h3>
              <p 
                v-if="currentLang === 'ja' ? post.summaryJa : post.summaryKo"
                class="post-summary"
              >
                {{ currentLang === 'ja' ? post.summaryJa : post.summaryKo }}
              </p>
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                <div class="post-stats">
                  <span class="like-count">{{ post.likeCount || 0 }} ♥</span>
                  <span class="comment-count">{{ post.commentCount || 0 }} 💬</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../utils/api'

const route = useRoute()
const posts = ref([])
const categories = ref([])
const selectedCategory = ref('')
const searchQuery = ref('')
const loading = ref(true)

const currentLang = computed(() => route.query.lang || 'ko')

const filteredPosts = computed(() => {
  let filtered = posts.value

  // 카테고리 필터링
  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.category === selectedCategory.value)
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => {
      const title = (currentLang.value === 'ja' ? post.titleJa : post.titleKo || '').toLowerCase()
      const content = (currentLang.value === 'ja' ? post.contentJa : post.contentKo || '').toLowerCase()
      return title.includes(query) || content.includes(query)
    })
  }

  return filtered
})

onMounted(async () => {
  // Knowledge 페이지에서는 body 배경을 기본 색상으로 설정
  document.body.style.backgroundImage = 'none'
  document.body.style.background = ''
  
  try {
    console.log('API 호출 시작 - 언어:', currentLang.value)
    const postsResponse = await api.get('/api/posts', { params: { lang: currentLang.value } })
    console.log('API 응답:', postsResponse.data)
    
    posts.value = postsResponse.data.posts || []
    categories.value = postsResponse.data.categories || []
    console.log('데이터 설정 완료 - posts:', posts.value.length, 'categories:', categories.value.length)
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  } finally {
    loading.value = false
  }
})

watch(currentLang, async (newLang) => {
  try {
    console.log('언어 변경 감지 - 새로운 언어:', newLang)
    const postsResponse = await api.get('/api/posts', { params: { lang: newLang } })
    console.log('언어 변경 후 API 응답:', postsResponse.data)
    
    posts.value = postsResponse.data.posts || []
    categories.value = postsResponse.data.categories || []
    console.log('언어 변경 후 데이터 설정 완료 - posts:', posts.value.length, 'categories:', categories.value.length)
  } catch (error) {
    console.error('언어 변경 시 데이터 로드 실패:', error)
  }
})

const selectCategory = (category) => {
  selectedCategory.value = category
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\./g, '-').replace(/\s/g, '')
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  text-align: center;
  width: 100%;
  padding: 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-image: url('/img/light_mode_bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease;
}

/* 다크모드일 때 hero-section 이미지 변경 */
.dark-mode .hero-section {
  background-image: url('/img/dark_mode_bg.jpg');
}

.hero-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

/* Page Layout */
.page-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 32px 24px;
  gap: 32px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  margin-bottom: 64px;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
}

.main-content {
  flex-grow: 1;
  min-width: 0;
}

/* Category Sidebar */
.category-list-wrapper {
  position: sticky;
  top: 88px;
}

.category-list-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #2c3e50;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 12px 8px;
  cursor: pointer;
  color: #4a5568;
  font-weight: 500;
  border-radius: 6px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.category-item:hover {
  background-color: #f1f5f9;
}

.category-item.active {
  color: #007bff;
  background-color: #e7f3ff;
  font-weight: 700;
}

/* Content Section */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.section-header-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.post-count {
  color: #718096;
  font-size: 0.95rem;
}

/* Search Form */
.search-form {
  position: relative;
}

.search-input {
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 8px 32px 8px 8px;
  font-size: 1rem;
  background-color: transparent;
  color: #2c3e50;
  width: 220px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-bottom-color: #555;
  width: 280px;
}

.search-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #2c3e50;
}

/* Post Grid */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}

.post-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  border: 1px solid #f1f1f1;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.1);
}

.post-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
}

.post-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image {
  transform: scale(1.05);
}

.post-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  font-size: 0.9rem;
}

.post-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.4;
}

.post-summary {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #666;
  border-top: 1px solid #f1f1f1;
  padding-top: 12px;
}

.post-date {
  font-weight: 500;
  color: #718096;
  font-size: 0.8rem;
}

.post-stats {
  display: flex;
  gap: 12px;
  align-items: center;
}

.like-count,
.comment-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  color: #666;
}

.like-count {
  color: #e53e3e;
}

.comment-count {
  color: #3182ce;
}

.no-posts {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: #f7fafc;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
  color: #718096;
}

.no-posts h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #4a5568;
}

/* 다크모드 */
.dark-mode .hero-title {
  color: #f7fafc;
  transition: color 0.5s ease;
}

.dark-mode .category-list-title {
  color: #e2e8f0;
  border-bottom-color: #4a5568;
  transition: color 0.5s ease, border-color 0.5s ease;
}

.dark-mode .category-item {
  color: #a0aec0;
  transition: color 0.5s ease;
}

.dark-mode .category-item:hover {
  background-color: #2d3748;
  transition: background-color 0.5s ease;
}

.dark-mode .category-item.active {
  color: #63b3ed;
  background-color: #2d3748;
  transition: color 0.5s ease, background-color 0.5s ease;
}

.dark-mode .section-title {
  color: #f7fafc;
  transition: color 0.5s ease;
}

.dark-mode .section-header {
  border-bottom-color: #4a5568;
  transition: border-color 0.5s ease;
}

.dark-mode .search-input {
  color: #f7fafc;
  border-bottom-color: #4a5568;
  transition: color 0.5s ease, border-color 0.5s ease;
}

.dark-mode .search-input:focus {
  border-bottom-color: #bbb;
  transition: border-color 0.5s ease;
}

.dark-mode .search-button {
  color: #a0aec0;
  transition: color 0.5s ease;
}

.dark-mode .post-card {
  background: #1a202c;
  border-color: #2d3748;
  transition: background 0.5s ease, border-color 0.5s ease;
}

.dark-mode .post-title {
  color: #edf2f7;
  transition: color 0.5s ease;
}

.dark-mode .post-summary {
  color: #a0aec0;
  transition: color 0.5s ease;
}

.dark-mode .post-meta {
  border-top-color: #2d3748;
  transition: border-color 0.5s ease;
}

.dark-mode .no-posts {
  background: #2d3748;
  border-color: #4a5568;
  color: #a0aec0;
  transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
}

.dark-mode .page-container {
  background-color: #1a202c;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .category-list-wrapper {
    position: static;
  }
  
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style> 