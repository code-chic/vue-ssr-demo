export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => {
    return {
      count: 0 // 设置计数器
    }
  },
  actions: {
    inc: ({ commit }) => {
      return new Promise(resolve => {
        setTimeout(() => resolve(Math.random() * 500), 500)
      }).then(count => {
        commit('inc', count)
      })
    }
  },
  mutations: {
    inc: (state, count) => {
      console.log('count: ', count)
      state.count = count
    }
  }
}
