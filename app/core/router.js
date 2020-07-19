import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index'

// 安装路由组件
Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    baseURL: '',
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
        title: '关于我们'
      }
    }]
  })
}
