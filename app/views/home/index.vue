<template>
  <div class="home">
    <p>这里是首页</p>
    <button type="button" @click="addTestDataHandle">test xhr</button>
    <button type="button" @click="getTestDataHandle">test mock xhr</button>
    <button type="button">test xhr timeout</button>
    <HelloWorld />
  </div>
</template>

<script>
import { getTestData, addTestData } from '@/api/test.api'
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'Home',
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
      console.log(result)
    }
  }
}
</script>

<style scoped>
.home {
  color: red;
}
</style>
