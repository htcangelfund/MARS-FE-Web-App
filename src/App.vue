<template>
  <div id="app">
    <transition mode="out-in" :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>




<script>
const route_LEV = {
  '/welcome': 0,
  '/selectLocation': 1,
  '/': 2,
  '/setting': 3
}
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      LEVEL: route_LEV
    }
  },
  watch: {
    '$route' (to, from) {
      let LEVEL = this.LEVEL
      let toDepth = LEVEL[to.path]
      let fromDepth = LEVEL[from.path]
      if ((toDepth === -1 || fromDepth === -1) || toDepth === fromDepth) {
        this.transitionName = ''
      } else {
        this.transitionName = toDepth < fromDepth ? 'fade-right' : 'fade-left'
      }
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  height: 100%;
  position: relative;
  font-weight: 500;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-left-enter-active,.fade-right-enter-active{
  transition: all .08 ease
}
.fade-left-leave-active, .fade-right-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
}
.fade-left-leave-to, .fade-right-enter{
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.fade-left-enter, .fade-right-leave-to{
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

</style>
