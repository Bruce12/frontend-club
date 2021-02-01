import { RouteRecordRaw } from 'vue-router'
export interface RoterMap {
  [propName: string]: RouteRecordRaw
}

const router: RoterMap = {
  icon: {
    path: '/icon',
    component: () => import('@/views/uc/index.vue'),
    meta: {
      title: '自定义图标'
    }
  },
  article: {
    path: '/article',
    component: () => import('@/views/article/index.vue'),
    meta: {
      title: '文章列表',
      icon: 'audio'
    }
  },
  notes: {
    path: '/notes',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '笔记列表'
    }
  },
  user: {
    path: '/user',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '用户列表'
    }
  },
  userInfo: {
    path: '/userInfo',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '用户详情'
    }
  },
  userGroup: {
    path: '/userGroup',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '用户分组'
    }
  },
  oters: {
    path: '/others',
    component: () => import('@/views/notes/index.vue'),
    meta: {
      title: '其他',
      hidden: true
    }
  }
}

export default Object.assign(router)
