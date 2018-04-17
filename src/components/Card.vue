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
        <button @click="flipCard">flip this</button>
      </div>
      <div class="card__back">
        <h2>Verso</h2>
        <button @click="flipCard">flip this</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  &.flip {
    transform: rotateY(180deg);
  }
}

/* hide back of pane during swap */
.card__front, .card__back {
	backface-visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
  width: 100%;
  height: 480px;
}

/* front pane, placed above back */
.card__front {
	z-index: 2;
	/* for firefox 31 */
	transform: rotateY(0deg);
}

/* back, initially hidden pane */
.card__back {
	transform: rotateY(180deg);
  background-color: #f2f2f2;
}
</style>
