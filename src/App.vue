<template>
  <div id="app">
    <header class="header">
      <h2>{{ pageTitle }}</h2>
      <button @click="toggleSidebar('active')" class="header__menuIcon">Abrir menu</button>
    </header>
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
  computed: {
    pageTitle() {
      return this.$route.name;
    }
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

button {
  outline: 0;
}

body {
  background: grey;
  height: 100%;
  font-size: 62.5%;
}

img {
  max-width: 100%;
	height: auto;
}

#app {
  position: relative;
  font-family: 'Roboto Slab', serif;
  text-align: center;
  color: #000;
  margin: 0 auto;
  background: white;
  max-width: 480px;
  min-height: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  display: table;
  text-align: center;
  padding: 30px 15px;
}

.header h2 {
  font-weight: 400;
  font-size: 2.4em;
  line-height: 1em;
}

.header h3 {
  font-weight: 300;
  font-size: 2em;
  line-height: 1em;
  margin: 20px 0;
}

.header p {
  font-size: 1.4em;
}

.header__menuIcon {
  position: absolute;
  top: 35px;
  right: 15px;
  width: 20px;
  height: 13px;
  background-color: transparent;
  background-image: url('./assets/icon-menu.png');
  border: 0;
  text-indent: -9999px;
}
</style>
