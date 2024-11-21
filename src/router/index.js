import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/services/index.vue'),
    meta: { title: '服务' }
  },
  {
    path: '/featured',
    name: 'Featured',
    component: () => import('@/views/featured/index.vue'),
    meta: { title: '精选' }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/community/index.vue'),
    meta: { title: '社区' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: { title: '我的' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - 索克健康`
  next()
})

export default router
