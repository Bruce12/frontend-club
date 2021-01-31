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
  private TOGGLE_SIDEBAR() {
    this.siderbar.opened = !this.siderbar.opened
    if (this.siderbar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR() {
    this.siderbar.opened = false
    setSidebarStatus('closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Action
  public toggleSideBar() {
    this.TOGGLE_SIDEBAR()
  }

  @Action
  public closeSideBar() {
    this.CLOSE_SIDEBAR()
  }

  @Action
  public toggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }
}

export const appStore = getModule<App>(App)
