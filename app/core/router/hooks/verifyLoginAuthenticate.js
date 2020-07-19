import Config from '@/config/index'

async function checkLogin () {
  const user = sessionStorage.getItem('user')
  return !!user
}

/**
 * 检查是否需要校验用户登录信息，以及身份信息的合法性
 * @param { VueRouter } router
 */
export default function verifyLoginAuthenticate (router) {
  router.beforeEach((to, from, next) => {
    let isAuth = to?.meta.isCheckLogin
    let len = to.matched.length
    // 校验 vue-router 匹配到的路由，并检查匹配路由是否存在 meta.isCheckLogin 为 true
    // 的路由，如果嵌套路由中存在那么一项，那么 isAuth 就为 true
    if (!isAuth && Config.isCheckLogin && len) {
      while (len--) {
        isAuth = to.matched[len - 1]?.meta.isCheckLogin === true
        if (isAuth) break
      }
    }
    if (isAuth && Config.isCheckLogin) {
      checkLogin().then(result => {
        next(result ? undefined : {
          path: '/login',
          query: {
            sourceUrl: from.fullPath
          }
        })
      }).catch(error => {
        next({ path: '/error' })
        throw error
      })
    } else {
      next() // 跳过身份信息验证
    }
  })
}
