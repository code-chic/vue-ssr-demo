import Vue from 'vue'
import VueRouter from 'vue-router'
import registerRouterHooks from '@/core/router/hooks'
import Home from '@/views/home/index'

// 安装路由组件
Vue.use(VueRouter)

export function createRouter () {
  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: Home,
      meta: {
        title: '首页',
        keepAlive: true
      }
    }, {
      path: '/about',
      component: () => import('@/views/about/index'),
      meta: {
        title: '关于我们',
        isCheckLogin: false
      }
    }]
  })

  registerRouterHooks(router)
  return router
}
