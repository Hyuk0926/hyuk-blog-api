<template>
  <div class="post-detail-container">
    <div class="container">
      <div v-if="loading" class="loading">
        {{ $t('post.loading') }}
      </div>
      <div v-else-if="!post" class="not-found">
        {{ $t('post.notFound') }}
      </div>
      <div v-else class="post-content">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.createdAt) }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <div class="post-body" v-html="post.content"></div>
        
        <!-- 좋아요 버튼 -->
        <div class="post-actions">
          <button 
            @click="toggleLike" 
            class="like-btn"
            :class="{ 'liked': isLiked }"
          >
            <span class="like-icon">❤️</span>
            <span class="like-count">{{ likeCount }}</span>
          </button>
        </div>
        
        <!-- 댓글 섹션 -->
        <div class="comments-section">
          <h3>{{ $t('post.comments') }}</h3>
          <div v-if="!isLoggedIn" class="login-prompt">
            {{ $t('post.loginToComment') }}
          </div>
          <div v-else class="comment-form">
            <textarea 
              v-model="newComment" 
              :placeholder="$t('post.commentPlaceholder')"
              class="comment-input"
            ></textarea>
            <button @click="addComment" class="btn btn-primary">
              {{ $t('post.addComment') }}
            </button>
          </div>
          
          <div class="comments-list">
            <div 
              v-for="comment in comments" 
              :key="comment.id" 
              class="comment-item"
            >
              <div class="comment-header">
                <span class="comment-author">{{ comment.nickname }}</span>
                <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import api from '../utils/api'

const route = useRoute()
const userStore = useUserStore()

const post = ref(null)
const comments = ref([])
const loading = ref(true)
const isLiked = ref(false)
const likeCount = ref(0)
const newComment = ref('')

const isLoggedIn = computed(() => userStore.isAuthenticated)

onMounted(async () => {
  await loadPost()
  await loadComments()
})

const loadPost = async () => {
  try {
    const response = await api.get(`/api/posts/${route.params.id}`, {
      params: { lang: route.query.lang || 'ko' }
    })
    post.value = response.data.post
    isLiked.value = response.data.isLiked
    likeCount.value = response.data.likeCount
  } catch (error) {
    console.error('게시글 로드 실패:', error)
  } finally {
    loading.value = false
  }
}

const loadComments = async () => {
  try {
    const response = await api.get(`/api/comments/${route.params.id}`, {
      params: { lang: route.query.lang || 'ko' }
    })
    comments.value = response.data.comments || []
  } catch (error) {
    console.error('댓글 로드 실패:', error)
  }
}

const toggleLike = async () => {
  if (!isLoggedIn.value) {
    alert('로그인이 필요합니다.')
    return
  }
  
  try {
    const response = await api.post(`/api/like/${route.params.id}`)
    isLiked.value = response.data.liked
    likeCount.value = response.data.likeCount
  } catch (error) {
    console.error('좋아요 토글 실패:', error)
  }
}

const addComment = async () => {
  if (!newComment.value.trim()) return
  
  try {
    await api.post(`/api/comments/${route.params.id}`, {
      content: newComment.value
    })
    newComment.value = ''
    await loadComments()
  } catch (error) {
    console.error('댓글 추가 실패:', error)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.post-detail-container {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.loading, .not-found {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.post-body {
  line-height: 1.8;
  margin-bottom: 2rem;
}

.post-actions {
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.like-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.like-btn:hover {
  background: #f8f9fa;
}

.like-btn.liked {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.comments-section {
  margin-top: 2rem;
}

.comments-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.login-prompt {
  text-align: center;
  color: #666;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  min-height: 100px;
  resize: vertical;
}

.comment-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-date {
  color: #666;
}

.comment-content {
  line-height: 1.6;
}

/* 다크모드 */
.dark-mode .post-title {
  color: #fff;
}

.dark-mode .post-meta {
  color: #ccc;
}

.dark-mode .post-actions {
  border-color: #4a5568;
}

.dark-mode .like-btn {
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .like-btn:hover {
  background: #2d3748;
}

.dark-mode .comments-section h3 {
  color: #e2e8f0;
}

.dark-mode .login-prompt {
  background: #2d3748;
  color: #a0aec0;
}

.dark-mode .comment-input {
  background: #1a202c;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-mode .comment-item {
  background: #2d3748;
}

.dark-mode .comment-author {
  color: #e2e8f0;
}

.dark-mode .comment-date {
  color: #a0aec0;
}
</style> 