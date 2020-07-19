import Vue from 'vue'
import Vuex from 'vuex'

// 安装状态管理器
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store()
  // import('@/core/store/modules/foo').then(fooModule => {
  //   store.registerModule('foo', fooModule)
  // })
}
