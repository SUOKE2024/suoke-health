import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/services/index.vue')
    },
    {
      path: '/featured',
      name: 'featured',
      component: () => import('@/views/featured/index.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/community/index.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/index.vue')
    }
  ]
})

export default router
