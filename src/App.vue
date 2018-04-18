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
  font-family: 'Roboto Slab', serif;
  text-align: center;
  color: #000;
  margin: 0 auto;
  background: white;
  max-width: 600px;
  min-height: 100%;
  overflow: hidden;
}
</style>
