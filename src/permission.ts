import router from '@/router'
import { permissionStore } from '@/store/modules/permission'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { App, toRaw } from 'vue'
nprogress.configure({ showSpinner: true })
// 路由登录做校验，校验用户权限
export const permission = (app: App) => {
  router.beforeEach(async(to) => {
    // console.log('路由进入')z
    nprogress.start()
    if (!permissionStore.isInited) {
      permissionStore.setInitStatus(true)
      // 初始化菜单
      await permissionStore.generateRoutes()
      // 替换
      const routes = toRaw(permissionStore.routes)
      const otherRoutes = toRaw(permissionStore.otherRoutes)
      ;[...routes, ...otherRoutes].forEach(item => {
        router.addRoute(item)
      })
      router.replace(to.fullPath)
    }
  })
  router.afterEach((to) => {
    document.title = to.meta.title
    nprogress.done()
  })
  app.use(router)
}
