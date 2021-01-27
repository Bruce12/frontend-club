import { Module } from 'vuex'
import { TOGGLE_SIDEBAR } from '../mutations-types'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookie'

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

// 应用程序全局变量
export const appModule: Module<IAppState, any> = {
  namespaced: true,
  state: {
    siderbar: {
      opened: getSidebarStatus() !== 'closed'
    },
    device: DeviceType.Desktop
  },
  mutations: {
    [TOGGLE_SIDEBAR](state) {
      state.siderbar.opened = !state.siderbar.opened
      if (state.siderbar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit(TOGGLE_SIDEBAR)
    }
  }
}
