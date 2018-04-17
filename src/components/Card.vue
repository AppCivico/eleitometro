<template>
  <div
    class="card"
    :style="{ width: `${width}%` }"
  >
    <div :class="`card__flipper ${isFlipped ? 'flip' : ''}`">
      <div
        class="card__front"
        :style="{ backgroundColor: content.backgroundColor }">
        <div v-html="content.frontHTML" />
        <button class="card__flipBtn" @click="flipCard">flip this</button>
      </div>
      <div class="card__back">
        <h2>Verso</h2>
        <button class="card__flipBtn card__flipBtn--back" @click="flipCard">flip this</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    content: Object,
    width: Number,
  },
  data() {
    return {
      isFlipped: false,
    }
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  float: left;
  padding: 0 1%;
  height: 480px;
  width: 100%;
  perspective: 1000px;
}

.card__flipper {
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
  height: 100%;

  &.flip {
    transform: rotateY(180deg);
  }
}

.card__front, .card__back {
	backface-visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 30px;
  border-radius: 14px;
}

.card__front {
	z-index: 2;
	transform: rotateY(0deg);
  color: #fff;
  font-size: 3em;
  text-align: left;
}

.card__back {
	transform: rotateY(180deg);
  background-color: #f2f2f2;
}

.card__flipBtn{
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  background-image: url('../assets/icon-graph.png');
  width: 30px;
  height: 30px;
  border: 0;
  text-indent: -9999px;
}

.card__flipBtn--back {
  background-image: url('../assets/icon-back.png');
}
</style>
