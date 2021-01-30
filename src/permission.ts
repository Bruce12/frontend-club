import router from '@/router'
import { store } from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { App, markRaw } from 'vue'
nprogress.configure({ showSpinner: true })
// 路由登录做校验，校验用户权限
export const permission = (app: App) => {
  router.beforeEach(async(to) => {
    // console.log('路由进入')z
    nprogress.start()
    if (!store.state.permissionModule.isInited) {
      store.dispatch('permissionModule/setInitStatus', true)
      // 初始化菜单
      await store.dispatch('permissionModule/generateRoutes')
      // 替换
      const routes = markRaw(store.state.permissionModule.routes)
      const otherRoutes = markRaw(store.state.permissionModule.otherRoutes)
      ;[...routes, ...otherRoutes].forEach(item => {
        router.addRoute(item)
      })
      console.log(store.state.permissionModule.routes)
      router.replace(to.fullPath)
    }
  })
  router.afterEach((to) => {
    document.title = to.meta.title
    nprogress.done()
  })
  app.use(router)
}
