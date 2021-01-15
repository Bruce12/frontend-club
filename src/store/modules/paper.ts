import { Module } from 'vuex'
import { PAPER_INDEX } from '../mutations-types'

export interface EditPaperModel {
  paperIndex: number
  questionList: Array<any>
}

const modelPaper: Module<EditPaperModel, any> = {
  namespaced: true,
  state: {
    paperIndex: 1,
    questionList: []
  },
  mutations: {
    [PAPER_INDEX](state, index) {
      state.paperIndex = index
    }
    /**
     * 1.全局list 列表，
     */
  },
  actions: {
    incrementPaperIndex({ commit }, inx: number) {
      commit(PAPER_INDEX, inx)
    }
  }
}
export default modelPaper
