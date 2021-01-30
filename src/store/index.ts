import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { appModule, IAppState } from './modules/app'
import { permissionModule, IPermissionState } from './modules/permission'

export interface IStoreState {
  appModule: IAppState,
  permissionModule: IPermissionState
}

export const sotreKey: InjectionKey<Store<IStoreState>> = Symbol('')

export const store = createStore<IStoreState>({
  modules: {
    appModule,
    permissionModule
  }
})
