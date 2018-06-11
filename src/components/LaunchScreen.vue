<template>
  <div :class="`launchScreen ${status === 'done' ? 'hidden' : ''}`">
    <div class="launchScreen__wrapper">
      <div class="launchScreen__container">
        <svg class="svg-icon">
          <use xlink:href="#logo_eleitometro"></use>
        </svg>
        <h1>Eleitômetro</h1>
        <h2>{{ subtitle }}</h2>
      </div>
      <div :class="`loadingBar ${status !== 'start' ? 'visible' : ''}`">
        <span :style="{
          width: `${loading}%`,
          backgroundColor: status === 'done' ? '#3ea0fb' : '',
        }" />
      </div>
      <svg class="svg-icon launchScreen__arrow">
          <use xlink:href="#icon_seta_baixo"></use>
        </svg>
      <img src="../assets/fgv-logo.png" class="fgvlogo">
    </div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  transition-timing-function: ease-in;
  transition: left 500ms 500ms;
  z-index: 5;

  &.hidden {
    left: -100%;

    @media (min-width: 769px) {
      left: 0;

      .loadingBar {
        opacity: 0;
      }
      .launchScreen__arrow {
        max-height: 1000px;
        opacity: 1;
      }
    }
  }

  @media (min-width: 769px) {
    position: relative;
    left: auto;
    top: auto;
    width: auto;
    height: auto;
    max-width: 320px;
    margin: 0 auto;
  }
}

.launchScreen__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  @media (min-width: 769px) {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
  }
}

.launchScreen__container {
  margin: 0 auto;
  max-width: 75%;
}

.launchScreen__container svg {
  min-width: 130px;
  height: auto;
  margin-bottom: 20px;
}

.launchScreen__container h1 {
  font-weight: 400;
  font-size: 4.2em;
  margin-bottom: 10px;
}

.launchScreen__container h2 {
  font-weight: 300;
  font-size: 2.4em;
}

.launchScreen .fgvlogo {
  position: relative;
  margin: 0 auto;
  max-width: 120px;
  height: auto;

  @media (min-width: 769px) {
    display: none;
  }
}

.loadingBar {
  position: relative;
  margin: 10% auto 5%;
  width: 80%;
  height: 2px;
  background: #dcdcdc;
  border-radius: 2px;
  opacity: 1;
  transition: opacity 100ms 500ms;
}

.loadingBar span {
  position: absolute;
  top: -1px;
  left: 0;
  display: block;
  height: 4px;
  width: 0;
  background: $gray;
  transition: width 250ms;
  border-radius: 2px;
}

.launchScreen__arrow {
  opacity: 0;
  width: 0;
  max-height: 0;

  @media (min-width: 769px) {
    width: 64px;
    height: 65px;
    margin-top: -20px;
    margin-bottom: 20px;
    transition: opacity 500ms 200ms, max-height 100ms 200ms;
  }
}
</style>
