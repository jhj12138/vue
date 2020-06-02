<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import '@/assets/css/reset.scss'
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    //获取屏幕宽度
    const htmlwidth = document.documentElement.clientWidth || document.body.clientWidth
    // 获取html的dom
    const htmldom = document.getElementsByTagName('html')[0]
    //设置html的font-size
    htmldom.style.fontSize = htmlwidth / 10 + 'px'
    window.addEventListener('resize', e => {
      const htmlwidth = document.documentElement.clientWidth || document.body.clientWidth
      htmldom.style.fontSize = htmlwidth / 10 + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>
