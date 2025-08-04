import axios from 'axios'

// axios 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버 주소
  timeout: 10000,
  withCredentials: true // 쿠키 포함
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // JWT 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('jwtToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 401 에러 시 로그아웃 처리
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
      localStorage.removeItem('jwtToken')
      window.location.href = '/user/login'
    }
    return Promise.reject(error)
  }
)

export default api 