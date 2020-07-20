import { createApp } from '@/core/main'

const { app: vm, router, store } = createApp()

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents()
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // 这里如果有加在指示器，就触发
    Promise.all(activated.map(c => {
      /**
       * @namespace c.asyncData
       * @type Function
       */
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  vm.$mount('#app')
})

/** @namespace window.__INITIAL_STATE__ */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
