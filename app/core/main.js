import Vue from 'vue'
import router from '@/core/router'
import App from '@/views/App'

import '@/style/index.css'

export default function initApp () {
  const app = new Vue({
    router,
    render: h => h(App)
  })

  return {
    app,
    router
  }
}
