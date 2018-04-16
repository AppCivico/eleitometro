<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}

body {
  background: grey;
  margin: 0;
  height: 100%;
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
