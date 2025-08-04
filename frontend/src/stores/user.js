import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../utils/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const admin = ref(null)
  const isAuthenticated = computed(() => !!user.value || !!admin.value)

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/user/login', {
        username,
        password
      })
      
      if (response.data.success) {
        user.value = response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user))
        if (response.data.jwtToken) {
          localStorage.setItem('jwtToken', response.data.jwtToken)
        }
        return response.data
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      throw error
    }
  }

  const adminLogin = async (username, password) => {
    try {
      const response = await api.post('/api/admin/auth/login', {
        username,
        password
      })
      
      if (response.data.success) {
        admin.value = response.data.admin
        localStorage.setItem('admin', JSON.stringify(response.data.admin))
        return response.data
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/api/user/register', userData)
      
      if (response.data.success) {
        return response.data
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/user/logout')
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error)
    } finally {
      user.value = null
      admin.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
      localStorage.removeItem('jwtToken')
    }
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedAdmin = localStorage.getItem('admin')
    
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
    
    if (savedAdmin) {
      admin.value = JSON.parse(savedAdmin)
    }
  }

  const checkUsername = async (username) => {
    try {
      const response = await api.post('/api/user/check-username', { username })
      return response.data.available
    } catch (error) {
      throw error
    }
  }

  const checkNickname = async (nickname) => {
    try {
      const response = await api.post('/api/user/check-nickname', { nickname })
      return response.data.available
    } catch (error) {
      throw error
    }
  }

  const checkEmail = async (email) => {
    try {
      const response = await api.post('/api/user/check-email', { email })
      return response.data.available
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    admin,
    isAuthenticated,
    login,
    adminLogin,
    register,
    logout,
    checkAuth,
    checkUsername,
    checkNickname,
    checkEmail
  }
}) 