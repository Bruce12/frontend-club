import { RouteRecordRaw } from 'vue-router'
export interface RoterMap {
  [propName: string]: RouteRecordRaw
}

const router: RoterMap = {
  uc: {
    path: '/uc',
    component: () => import('@/views/uc/index.vue'),
    meta: {
      title: '用户中心'
    }
  },
  notes: {
    path: '/notes',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '笔记管理'
    }
  }
}

export default Object.assign(router)
