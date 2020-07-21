<template>
  <div class="about">
    <h3>这里是关于我们</h3>
    <p>下面是服务端渲染列表：</p>
    <table style="width: 500px;" border="1">
      <thead>
        <tr>
          <th>序号</th>
          <th>名称</th>
          <th>年龄</th>
          <th>性别</th>
        </tr>
      </thead>
      <tbody v-for="item in getUserTableList" :key="item.id">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.sex }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import testStoreModule from '@/core/store/modules/test'

export default {
  name: 'About',
  asyncData ({ store }) {
    store.registerModule('test', testStoreModule)
    return store.dispatch('test/useTable')
  },

  destroyed () {
    this.$store.unregisterModule('test')
  },

  computed: {
    getUserTableList () {
      return this.$store.state.test.items
    }
  }
}
</script>

<style scoped>
.about {
  color: blue;
}
</style>
