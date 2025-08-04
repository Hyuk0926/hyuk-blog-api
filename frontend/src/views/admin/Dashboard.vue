<template>
  <div class="admin-dashboard-container">
    <div class="container">
      <h1 class="page-title">{{ $t('admin.dashboard.title') }}</h1>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>{{ $t('admin.dashboard.totalPosts') }}</h3>
          <p class="stat-number">{{ stats.totalPosts }}</p>
        </div>
        <div class="stat-card">
          <h3>{{ $t('admin.dashboard.totalUsers') }}</h3>
          <p class="stat-number">{{ stats.totalUsers }}</p>
        </div>
        <div class="stat-card">
          <h3>{{ $t('admin.dashboard.totalComments') }}</h3>
          <p class="stat-number">{{ stats.totalComments }}</p>
        </div>
        <div class="stat-card">
          <h3>{{ $t('admin.dashboard.newInquiries') }}</h3>
          <p class="stat-number">{{ stats.newInquiries }}</p>
        </div>
      </div>
      
      <div class="dashboard-actions">
        <router-link to="/admin/posts/new" class="action-btn">
          {{ $t('admin.dashboard.newPost') }}
        </router-link>
        <router-link to="/admin/inquiries" class="action-btn">
          {{ $t('admin.dashboard.viewInquiries') }}
        </router-link>
        <router-link to="/admin/resume" class="action-btn">
          {{ $t('admin.dashboard.editResume') }}
        </router-link>
      </div>
      
      <div class="recent-posts">
        <h2>{{ $t('admin.dashboard.recentPosts') }}</h2>
        <div v-if="loading" class="loading">
          {{ $t('admin.dashboard.loading') }}
        </div>
        <div v-else-if="recentPosts.length === 0" class="no-posts">
          {{ $t('admin.dashboard.noPosts') }}
        </div>
        <div v-else class="posts-list">
          <div 
            v-for="post in recentPosts" 
            :key="post.id" 
            class="post-item"
          >
            <div class="post-info">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
            <div class="post-actions">
              <button @click="editPost(post.id)" class="btn btn-sm btn-primary">
                {{ $t('admin.dashboard.edit') }}
              </button>
              <button @click="deletePost(post.id)" class="btn btn-sm btn-danger">
                {{ $t('admin.dashboard.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../utils/api'

const router = useRouter()
const stats = ref({
  totalPosts: 0,
  totalUsers: 0,
  totalComments: 0,
  newInquiries: 0
})
const recentPosts = ref([])
const loading = ref(true)

onMounted(async () => {
  await loadDashboard()
})

const loadDashboard = async () => {
  try {
    const response = await api.get('/api/admin/dashboard')
    stats.value = response.data.stats
    recentPosts.value = response.data.recentPosts || []
  } catch (error) {
    console.error('대시보드 로드 실패:', error)
  } finally {
    loading.value = false
  }
}

const editPost = (id) => {
  router.push(`/admin/posts/${id}/edit`)
}

const deletePost = async (id) => {
  if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return
  
  try {
    await api.delete(`/api/admin/posts/${id}`)
    await loadDashboard()
  } catch (error) {
    console.error('게시글 삭제 실패:', error)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.admin-dashboard-container {
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

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #007bff;
  margin: 0;
}

.dashboard-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background: #0056b3;
}

.recent-posts {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recent-posts h2 {
  margin-bottom: 1rem;
  color: #333;
}

.loading, .no-posts {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.post-item:hover {
  background: #f8f9fa;
}

.post-info {
  flex: 1;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

/* 다크모드 */
.dark-mode .page-title {
  color: #fff;
}

.dark-mode .stat-card {
  background: #2d3748;
  color: #e2e8f0;
}

.dark-mode .stat-card h3 {
  color: #a0aec0;
}

.dark-mode .stat-number {
  color: #4dabf7;
}

.dark-mode .recent-posts {
  background: #2d3748;
  color: #e2e8f0;
}

.dark-mode .recent-posts h2 {
  color: #e2e8f0;
}

.dark-mode .loading,
.dark-mode .no-posts {
  color: #a0aec0;
}

.dark-mode .post-item {
  border-color: #4a5568;
}

.dark-mode .post-item:hover {
  background: #1a202c;
}

.dark-mode .post-title {
  color: #e2e8f0;
}

.dark-mode .post-date {
  color: #a0aec0;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-actions {
    flex-direction: column;
  }
  
  .post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .post-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 