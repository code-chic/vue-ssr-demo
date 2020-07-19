import Vue from 'vue'
import { createRouter } from '@/core/router'
import { createStore } from '@/core/store'
import { sync } from 'vuex-router-sync'
import App from '@/views/App'

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  sync(store, router) // 同步路由状态（route, state）和 store
  // 初始化创建 Vue 实例
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}

// import Vue from 'vue'
// import { createRouter } from '@/core/router/index'
// import { createStore } from '@/core/store/index'
// import { sync } from 'vuex-router-sync'
// import App from '@/views/App'
//
// import '@/style/index.css'
//
// export default function initApp () {
//   // 创建 router 和 store 实例
//   const router = createRouter()
//   const store = createStore()
//   // 同步路由状态(route state)到 store
//   sync(store, router)
//
//   const app = new Vue({
//     store,
//     router,
//     render: h => h(App)
//   })
//   return { app, router, store }
// }
