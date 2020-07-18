import Vue from 'vue'
import { createRouter } from '@/core/router'
import App from '@/views/App'

import '@/style/index.css'

export default function initApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}
