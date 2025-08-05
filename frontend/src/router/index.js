import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Knowledge from '../views/Knowledge.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Projects from '../views/Projects.vue'
import PostDetail from '../views/PostDetail.vue'
import Search from '../views/Search.vue'
import UserLogin from '../views/user/Login.vue'
import UserRegister from '../views/user/Register.vue'
import AdminLogin from '../views/admin/Login.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import Error from '../views/Error.vue'

const routes = [
  {
    path: '/',
    name: 'Knowledge',
    component: Knowledge
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: Error
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 라우터 가드에서 언어 변경 처리
router.beforeEach((to, from, next) => {
  const lang = to.query.lang
  
  if (lang && ['ko', 'ja'].includes(lang)) {
    // localStorage에 언어 설정 저장
    localStorage.setItem('locale', lang)
  } else {
    // URL에 언어 파라미터가 없으면 localStorage에서 가져오기
    const savedLang = localStorage.getItem('locale') || 'ko'
    // URL에 언어 파라미터 추가
    if (to.path !== from.path || !to.query.lang) {
      return next({ path: to.path, query: { ...to.query, lang: savedLang } })
    }
  }
  
  next()
})

export default router 