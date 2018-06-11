<template>
  <div :class="`summary ${status === 'done' ? 'active' : ''}`">
    <div
      class="summary__wrapper"
      :style="{
        width: `${cardsQt * 100}%`,
        marginLeft: movement,
      }"
    >
      <div class="card card__cta" :style="{ width: `${cardWidth}%`}">
        <h3>Deslize para saber tudo sobre as eleições nas redes<svg class="svg-icon svg-icon--inline"><use xlink:href="#icon_seta_direita"></use></svg></h3>
      </div>
      <Card v-for="card in cards" :key="card.id" :content="card" :width="cardWidth"/>
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
  props: {
    status: String,
  },
  components: {
    Card,
  },
  data() {
    return {
      activeCard: 0,
      touchStart: 0,
      touchEnd: 0,
      movement: '0',
      ongoingTouches: [],
    }
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
    cards() {
      return this.$store.state.cards;
    },
    cardsQt() {
      return this.cards.length + 1;
    },
    cardWidth() {
      if (window.outerWidth <= 768) {
        return (95 / this.cardsQt);
      }

      return (95 / (this.cardsQt * 2));
    },
    barColor() {
      if (this.activeCard === 0) {
        return config.colors.gray;
      }
      if (this.cards.length > 0) {
        return this.cards[this.activeCard - 1].backgroundColor;
      }
      return config.colors.blue;
    },
  },
  watch: {
    userType() {
      this.handleTouch();
    },
  },
  mounted() {
    this.handleTouch();
    if (window.outerWidth <= 768) {
      this.ongoingTouches = [{ screenX: window.outerWidth * 2 }];
    }
  },
  methods: {
    copyTouch(touch) {
      return { screenX: touch.screenX };
    },
    swipeCard(movement) {
      if (movement === 'left' && this.activeCard < this.cardsQt - 1) {
        this.activeCard = this.activeCard + 1;
      } else if (movement === 'right' && this.activeCard > 0) {
        this.activeCard = this.activeCard - 1;
      }

      if (window.outerWidth <= 768) {
        this.movement = `-${this.activeCard * 95}%`;
      } else {
        this.movement = `-${this.activeCard * (95 / 2)}%`;
      }
    },
    handleTouch() {
      const gestureZone = document.querySelector('.summary');

      if (this.userType === 'touch') {
        gestureZone.addEventListener('touchstart', (event) => {
          this.ongoingTouches.push(this.copyTouch(event.changedTouches[0]));
          this.touchStart = event.changedTouches[0].screenX;
        }, false);

        gestureZone.addEventListener('touchmove', (event) => {
          const currentTouch = event.changedTouches[0].screenX;
          this.handleMove(currentTouch);
        }, false);

        gestureZone.addEventListener('touchend', (event) => {
          this.touchEnd = event.changedTouches[0].screenX;
          this.handleGesture(this.touchStart, this.touchEnd);
        }, false);
      } else {
        gestureZone.addEventListener('mousedown', (event) => {
          if (event.target.localName !== 'button') {
            this.ongoingTouches.push(this.copyTouch(event));
            this.touchStart = event.screenX;
          }
        }, false);

        // gestureZone.addEventListener('mousemove', (event) => {
        //   if (this.ongoingTouches.length > 0) {
        //     const currentTouch = event.screenX;
        //     this.handleMove(currentTouch);
        //   }
        // }, false);

        gestureZone.addEventListener('mouseup', (event) => {
          if (event.target.localName !== 'button') {
            this.touchEnd = event.screenX;
            this.ongoingTouches = [];
            this.handleGesture(this.touchStart, this.touchEnd);
          }
        }, false);
      }
    },
    handleMove(current) {
      const lastItem = this.ongoingTouches[this.ongoingTouches.length - 1];
      const currentMovement = parseFloat(this.movement, 10);
      if (lastItem) {
        if (current < lastItem.screenX) {
          const newMovement = currentMovement - 1;
          this.movement = `${newMovement}%`;
        } else if (current > lastItem.screenX) {
          const newMovement = currentMovement + 1;
          this.movement = `${newMovement}%`;
        }
      }
    },
    handleGesture(start, end) {
      const handleWidth = Math.abs(end - start);
      let move = false;
      if (this.userType === 'touch') {
        if (handleWidth > 70) {
          move = true;
        }
      } else {
        if (handleWidth > 80) {
          move = true;
        }
      }

      if (move) {
        if (end < start) {
          this.swipeCard('left');
        } else if (end > start) {
          this.swipeCard('right');
        }
      } else {
        this.movement = `-${this.activeCard * 95}%`;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.summary {
  width: 100%;
  margin-left: 100%;
  transition-timing-function: ease-in;
  transition: margin-left 500ms 500ms;

  &.active {
    margin-left: 0;
  }
}
.summary__wrapper {
  display: table;
  transition: margin-left 250ms;
  margin-bottom: 20px;
  min-height: 470px;
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
.card__cta {
  text-align: left;
}

.card__cta h3 {
  font-weight: 300;
  font-size: 3em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
</style>
