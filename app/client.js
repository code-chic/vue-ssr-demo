import initApp from '@/core/main'

const { app: vm, router } = initApp()

router.onReady(() => {
  vm.$mount('#app')
})
