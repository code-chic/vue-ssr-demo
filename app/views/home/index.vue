<template>
  <div class="home">
    <p>{{ item }}</p>
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
  data () {
    return {
      name: '这里是动态数据绑定'
    }
  },
  asyncData ({ store }) {
    // 在触发 action 后， 会返回 Promise
    return store.dispatch('fetchItem', 1)
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
      console.log(result)
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item
    item () {
      return this.$store.state.items[1]
    }
  }
}
</script>

<style scoped>
.home {
  color: red;
}
</style>
