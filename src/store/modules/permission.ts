import Loayout from '@/layout/index.vue'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { RouteRecordRaw } from 'vue-router'
import asyncRoutes from '@/router/routes'
import store from '@/store'

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
  { id: 1, parentId: 0, title: '用户管理', path: '', icon: 'international' },
  { id: 5, parentId: 1, path: '/user' },
  { id: 6, parentId: 1, path: '/userInfo' },
  { id: 7, parentId: 1, path: '/userGroup' },
  { id: 2, parentId: 0, title: '文章管理', path: '', icon: 'money' },
  { id: 8, parentId: 2, path: '/article' },
  { id: 3, parentId: 0, title: '笔记管理', path: '', icon: 'people' },
  { id: 9, parentId: 3, path: '/notes' }
]

@Module({ namespaced: true, store, name: 'permission', dynamic: true })
class Permission extends VuexModule implements IPermissionState {
  public isInited = false
  public routes = []
  public otherRoutes = []
  @Mutation
  SET_ROUTER(routers) {
    this.routes = routers
  }

  @Mutation
  SET_ININTED(status: boolean) {
    this.isInited = status
  }

  @Mutation
  SET_OTHER_ROUTES(routes) {
    this.otherRoutes = routes
  }

  @Action
  // 设置app初始化标识
  setInitStatus(status: boolean) {
    this.SET_ININTED(status)
  }

  @Action
  // 生成路由 generateRoutes
  async generateRoutes() {
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
          path: `/root_${obj.id}`,
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
          const routerObj = routerMap[`_root_${obj.parentId}`]
          if (!routerObj.redirect) {
            routerObj.redirect = o.path
          }
          routerObj.children.push(sub)
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
      }, 1000)
    })
    // 注册路由 (提取出去，setRouter )
    const a = await prosi
    console.log(routes)
    this.SET_ROUTER(routes)
    this.SET_OTHER_ROUTES(otherRoutes)
  }
}
export const permissionStore = getModule<Permission>(Permission)
