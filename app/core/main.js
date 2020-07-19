import Vue from 'vue'
import { createRouter } from '@/core/router'
import { createStore } from '@/core/store'
import { sync } from 'vuex-router-sync'
import App from '@/views/App'

import '@/style/index.css'

export default function initApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}
