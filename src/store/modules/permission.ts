import Loayout from '@/layout/index.vue'
import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import asyncRoutes from '@/router/routes'
import router from '@/router'
import { SET_ROUTER, SET_ININTED, SET_OTHER_ROUTES } from '../mutations-types'

export interface IPermissionState {
  isInited: boolean
  routes: RouteRecordRaw[] // 服务器匹配到的routes，主要用于生成导航栏
  otherRoutes: RouteRecordRaw[] // 本地其他用于测试的routes
}
export interface RoterConfigRaw {
  id: number
  parentId: number
  path: string
  icon?: string
  title?: string
}
// 后台去配置这个roter
export const routerCcofnig: RoterConfigRaw[] = [
  { id: 1, parentId: 0, title: '用户管理', path: '', icon: 'el-icon-user-solid' },
  { id: 5, parentId: 1, path: '/user' },
  { id: 6, parentId: 1, path: '/userInfo' },
  { id: 7, parentId: 1, path: '/userGroup' },
  { id: 2, parentId: 0, title: '文章管理', path: '', icon: 'el-icon-s-claim' },
  { id: 8, parentId: 2, path: '/article' },
  { id: 3, parentId: 0, title: '笔记管理', path: '', icon: 'el-icon-s-order' },
  { id: 9, parentId: 3, path: '/notes' },
  { id: 4, parentId: 0, title: '组件管理', path: '', icon: 'el-icon-help' },
  { id: 10, parentId: 4, path: '/uc' },
  { id: 11, parentId: 4, path: '/ucSettting' }
]

export const permissionModule: Module<IPermissionState, any> = {
  namespaced: true,
  state: {
    isInited: false,
    routes: [],
    otherRoutes: []
  },
  mutations: {
    [SET_ROUTER](state, routers) {
      state.routes = routers
    },
    [SET_ININTED](state, status) {
      state.isInited = status
    },
    [SET_OTHER_ROUTES](state, routes) {
      state.otherRoutes = routes
    }
  },
  actions: {
    // 设置app初始化标识
    setInitStatus({ commit }, status) {
      commit(SET_ININTED, status)
    },
    // 生成路由 generateRoutes
    async generateRoutes({ commit }) {
      const routes: any = []
      const routerMap = {}
      const otherRoutes: any = []
      // 从数据库获取 routerconfig
      const len = routerCcofnig.length
      for (let i = 0; i < len; i++) {
        const obj = routerCcofnig[i]
        // 构建1级主菜单
        if (obj.parentId === 0) {
          routerMap[`_root_${obj.id}`] = {
            path: obj.path,
            component: Loayout,
            name: `root_${obj.id}`,
            meta: {
              icon: obj.icon,
              title: obj.title
            },
            children: []
          }
        }
      }
      // 构建子菜单
      for (let i = 0; i < len; i++) {
        const obj = routerCcofnig[i]
        if (obj.parentId === 0 || !obj.path) continue
        for (const key of Object.keys(asyncRoutes)) {
          const o = asyncRoutes[key]
          if (o.path === obj.path) {
            // 子组件
            const sub = {
              ...o,
              meta: {
                ...o.meta,
                title: obj.title || o.meta.title
              }
            }
            console.log(obj.parentId)
            routerMap[`_root_${obj.parentId}`].children.push(sub)
            // 已经初始化
            o.inited = true
          }
        }
      }
      // 注册路由 带菜单
      for (const key in routerMap) {
        routes.push(routerMap[key])
      }
      for (const key in asyncRoutes) {
        const o = asyncRoutes[key]
        if (!o.inited) {
          console.log(o)
          if (!o.meta.hidden) {
            otherRoutes.push({
              path: o.path,
              component: Loayout,
              redirect: o.path,
              children: [o]
            })
          } else {
            otherRoutes.push(o)
          }
        }
      }
      // 模拟从数据库中获取
      const prosi = new Promise((resolve) => {
        setTimeout(() => {
          resolve({})
        }, 2000)
      })
      // 注册路由 (提取出去，setRouter )
      const a = await prosi
      commit(SET_ROUTER, routes)
      commit(SET_OTHER_ROUTES, otherRoutes)
    }
  }
}
