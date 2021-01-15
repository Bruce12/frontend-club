import router from '@/router'
import { App } from 'vue'
// 路由登录做校验，校验用户权限
export const permission = (app: App) => {
  router.beforeEach(() => {
    // console.log('路由进入')
  })
  router.afterEach((to) => {
    document.title = to.meta.title
  })
  app.use(router)
}
