import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** @returns Store */
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise.
        // 以便我们能够知道数据在何时更新
        return new Promise(resolve => {
          setTimeout(() => resolve(Math.random() * 500), 500)
        }).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}
