<template>
  <div class="home">
    <p>{{ fooCount }}</p>
    <button type="button" @click="addTestDataHandle">test xhr</button>
    <button type="button" @click="getTestDataHandle">test mock xhr</button>
    <button type="button" @click="getRealTestDataHandle">get real api data</button>
    <HelloWorld />
  </div>
</template>

<script>
import { getTestData, addTestData, getTestUserInfo } from '@/api/test.api'
import HelloWorld from '@/components/HelloWorld'
import fooStoreModule from '@/core/store/modules/foo'

export default {
  name: 'Home',
  asyncData ({ store }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/inc')
  },
  components: {
    HelloWorld
  },
  methods: {
    async getTestDataHandle () {
      const result = await getTestData({ testId: 1 })
      console.log(result)
    },
    async addTestDataHandle () {
      const result = await addTestData({ name: '张大炮', age: 22 })
      console.log('mock data: ', result)
    },
    // 从真实接口中获取数据
    async getRealTestDataHandle () {
      const result = await getTestUserInfo()
      console.log('real data: ', result)
    }
  },
  // 重要信息：当多次访问路由时
  // 避免在客户端重复注册模块
  destroyed () {
    this.$store.unregisterModule('foo')
  },
  computed: {
    fooCount () {
      return this.$store.state.foo.count
    }
  }
}
</script>

<style scoped>
.home {
  color: red;
}
</style>
