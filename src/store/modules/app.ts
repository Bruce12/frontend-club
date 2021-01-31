import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookie'
import store from '@/store'
export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType
  siderbar: {
    opened: boolean
  }
}
@Module({ namespaced: true, store, name: 'app', dynamic: true })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public siderbar = {
    opened: getSidebarStatus() !== 'closed'
  }

  @Mutation
  TOGGLE_SIDEBAR() {
    this.siderbar.opened = !this.siderbar.opened
    if (this.siderbar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Action
  toggleSideBar() {
    this.TOGGLE_SIDEBAR()
  }
}

export const appStore = getModule<App>(App)
