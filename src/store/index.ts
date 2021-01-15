import { createStore } from 'vuex'
import modelPaper, { EditPaperModel } from './modules/paper'

export interface IStoreState {
  modelPaper: EditPaperModel
}

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    modelPaper
  }
})
