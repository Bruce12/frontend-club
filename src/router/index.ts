import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Loayout from '@/layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Loayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/index/index.vue'),
        name: 'dashboard',
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
