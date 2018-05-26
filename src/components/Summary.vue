<template>
  <div class="summary">
    <div
      class="summary__wrapper"
      :style="{
        width: `${cardsQt * 100}%`,
        marginLeft: `-${activeCard * 100}%`,
      }"
    >
      <Card v-for="card in cards" :key="card.id" :content="card" :width="100 / cardsQt"/>
    </div>
    <div class="scrollBar">
      <span
        :style="{
          width: `${100 / cardsQt}%`,
          left: `${activeCard * (100 / cardsQt)}%`,
          backgroundColor: barColor,
        }" />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import config from '../config';

export default {
  name: 'Summary',
  components: {
    Card,
  },
  data() {
    return {
      activeCard: 0,
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    cardsQt() {
      return this.cards.length;
    },
    barColor() {
      if (this.cards.length > 0) {
        return this.cards[this.activeCard].backgroundColor;
      }
      return config.colors.blue;
    }
  },
  mounted() {
    this.handleTouch();
  },
  methods: {
    swipeCard(movement) {
      if (movement === 'left' && this.activeCard < this.cardsQt - 1) {
        this.activeCard = this.activeCard + 1;
      } else if (movement === 'right' && this.activeCard > 0) {
        this.activeCard = this.activeCard - 1;
      }
    },
    handleTouch() {
      let touchstartX = 0;
      let touchendX = 0;

      const gestureZone = document.querySelector('.summary');

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
        if (end < start) {
          this.swipeCard('left');
        } else if (end > start) {
          this.swipeCard('right');
        }
      }
    }
  },
};
</script>

<style scoped lang="scss">
.summary {
  width: 100%;
}
.summary__wrapper {
  display: table;
  transition: margin-left 250ms;
  margin-bottom: 20px;
}
.scrollBar {
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background: #dcdcdc;
  border-radius: 2px;
  margin-bottom: 1px;
}
.scrollBar span {
  position: absolute;
  top: -1px;
  left: 0;
  display: block;
  height: 4px;
  width: 20%;
  background: gray;
  transition: left 250ms, background-color 250ms;
  border-radius: 2px;
}
</style>
