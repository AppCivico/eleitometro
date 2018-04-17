<template>
  <div :class="`launchScreen ${status === 'done' ? 'hidden' : ''}`">
    <img src="../assets/logo.png">
    <h1>Eleitômetro</h1>
    <h2>{{ subtitle }}</h2>
    <div class="loadingBar">
      <span :style="{ width: `${loading}%` }" />
    </div>
    <img src="../assets/fgv-logo.png">
  </div>
</template>

<script>
export default {
  name: 'LauchScreen',
  props: {
    status: String,
  },
  computed: {
    subtitle() {
       if (this.status !== 'start') {
        return 'A corrida eleitoral nas redes, analisada em tempo real'
      }

      return '2018'
    },
    loading() {
      if (this.status === 'loading') {
        return 50
      } else if (this.status === 'done') {
        return 100
      }
      return 0;
    }
  }
};
</script>

<style scoped lang="scss">
.launchScreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 1;
  max-height: 1000px;
  overflow: hidden;
  transition: opacity 500ms, max-height 100ms 500ms;
  z-index: 5;

  &.hidden {
    max-height: 0;
    opacity: 0;
  }
}
.loadingBar {
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background: #dcdcdc;
  border-radius: 2px;
}
.loadingBar span {
  position: absolute;
  top: -1px;
  left: 0;
  display: block;
  height: 4px;
  width: 0;
  background: gray;
  transition: width 250ms;
  border-radius: 2px;
}
</style>
