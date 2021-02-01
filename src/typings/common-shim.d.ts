import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    index: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
// vue router
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    hidden?: boolean
    icon?: string
  }
}
