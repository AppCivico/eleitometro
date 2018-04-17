<template>
  <div id="app">
    <button @click="toggleSidebar('active')">Open sidebar</button>
    <Sidebar :status="sidebar" @closeSidebar="toggleSidebar('')"/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  data() {
    return {
      sidebar: '',
    }
  },
  methods: {
    toggleSidebar(status) {
      this.sidebar = status;
    },
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

body {
  background: grey;
  height: 100%;
  font-size: 62.5%;
}

#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  background: white;
  max-width: 600px;
  min-height: 100%;
}
</style>
