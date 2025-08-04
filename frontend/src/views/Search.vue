<template>
  <div class="search-container">
    <div class="container">
      <h1 class="page-title">{{ $t('search.title') }}</h1>
      
      <div class="search-form">
        <input 
          v-model="searchQuery" 
          @input="handleSearch"
          :placeholder="$t('search.placeholder')"
          class="search-input"
        >
      </div>
      
      <div v-if="loading" class="loading">
        {{ $t('search.loading') }}
      </div>
      <div v-else-if="searchQuery && results.length === 0" class="no-results">
        {{ $t('search.noResults') }}
      </div>
      <div v-else-if="results.length > 0" class="search-results">
        <h2>{{ $t('search.results') }} ({{ results.length }})</h2>
        <div class="results-grid">
          <div 
            v-for="result in results" 
            :key="result.id" 
            class="result-card"
            @click="viewPost(result.id)"
          >
            <h3 class="result-title">{{ result.title }}</h3>
            <p class="result-description">{{ result.description }}</p>
            <div class="result-meta">
              <span class="result-date">{{ formatDate(result.createdAt) }}</span>
              <span class="result-category">{{ result.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../utils/api'

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const results = ref([])
const loading = ref(false)

onMounted(() => {
  // URL에서 검색어가 있으면 설정
  if (route.query.q) {
    searchQuery.value = route.query.q
    handleSearch()
  }
})

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    results.value = []
    return
  }
  
  loading.value = true
  
  try {
    const response = await api.get('/api/search', {
      params: { 
        q: searchQuery.value,
        lang: route.query.lang || 'ko'
      }
    })
    results.value = response.data.results || []
  } catch (error) {
    console.error('검색 실패:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

const viewPost = (id) => {
  router.push(`/post/${id}?lang=${route.query.lang || 'ko'}`)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.search-container {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.search-form {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.loading, .no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
}

.search-results h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.result-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.result-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.result-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.result-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
}

/* 다크모드 */
.dark-mode .page-title {
  color: #fff;
}

.dark-mode .search-input {
  background: #1a202c;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .search-input:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.dark-mode .loading,
.dark-mode .no-results {
  color: #ccc;
}

.dark-mode .search-results h2 {
  color: #e2e8f0;
}

.dark-mode .result-card {
  background: #2d3748;
  color: #e2e8f0;
}

.dark-mode .result-title {
  color: #e2e8f0;
}

.dark-mode .result-description {
  color: #a0aec0;
}

.dark-mode .result-meta {
  color: #718096;
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style> 