import { getTestDataList } from '@/api/test.api'

export default {
  namespaced: true,
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    useTable: ({ commit }) => {
      return getTestDataList().then(result => {
        commit('useTable', result.data)
      })
    }
  },
  mutations: {
    useTable: (state, { data }) => {
      console.log('api result: ', data)
      state.items = data
    }
  }
}
