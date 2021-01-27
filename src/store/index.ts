import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { appModule, IAppState } from './modules/app'

export interface IStoreState {
  appModule: IAppState
}

export const sotreKey: InjectionKey<Store<IStoreState>> = Symbol('')

export const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    appModule
  }
})
