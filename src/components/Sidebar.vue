<template>
  <div :class="`sidebar ${status === 'active' ? 'open' : ''}`">
    <button @click="close">Close</button>
    <img src="../assets/logo.png">
    <h1>Resumo</h1>
    <h2>Análise</h2>
    <ul>
      <li>
        <a href="#">Panoarama (3)</a>
        <ul>
          <li><a href="#">Debate Geral</a></li>
          <li><a href="#">Robôs na Rede</a></li>
          <li><a href="#">Civilidade</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Candidatos (3)</a>
        <ul>
          <li><a href="#">Lula</a></li>
          <li><a href="#">Marina</a></li>
          <li><a href="#">Manuela</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Temas (3)</a>
        <ul>
          <li><a href="#">Economia</a></li>
          <li><a href="#">Educação</a></li>
          <li><a href="#">Segurança</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    status: String,
  },
  mounted() {
    this.handleTouch();
  },
  methods: {
    close() {
      this.$emit('closeSidebar', '');
    },
    handleTouch() {
      let touchstartX = 0;
      let touchendX = 0;

      const gestureZone = document.querySelector('.sidebar');

      gestureZone.addEventListener('touchstart', (event) => {
        this.touchStart = event.changedTouches[0].screenX;
      }, false);

      gestureZone.addEventListener('touchend', (event) => {
        this.touchEnd = event.changedTouches[0].screenX;
        this.handleGesture(this.touchStart, this.touchEnd);
      }, false);
    },
    handleGesture(start, end) {
      const handleWidth = Math.abs(end - start);
      if (handleWidth > 100) {
        if (end > start) {
          this.close();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  top: 0;
  right: -100%;
  width: 90%;
  height: 100%;
  background: #f2f2f2;
  opacity: 1;
  overflow: hidden;
  transition: right 500ms;
  z-index: 5;

  &.open {
    right: 0;
  }
}
</style>
