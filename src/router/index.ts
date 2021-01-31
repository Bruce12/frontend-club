import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Loayout from '@/layout/index.vue'
export const constantRoutes: Array<RouteRecordRaw> = [
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/error_page/index.vue'),
    meta: {
      title: 'notFound'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
