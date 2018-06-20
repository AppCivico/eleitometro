<template>
  <div
    class="card"
    :style="{ width: `${width}%` }"
  >
    <div :class="`card__flipper ${isFlipped ? 'flip' : ''}`">
      <div
        class="card__front"
        :style="{ backgroundColor: content.backgroundColor }">
        <div v-html="content.frontHTML" class="front__content" />
        <div :class="`card__share ${showShare ? 'open' : ''}`">
          <h3>Compartilhe<br>este card</h3>
          <ul>
            <li class="facebook">
              <a target="_blank" rel="noopener" href="#" @click.prevent="shareFacebook">
                Compartilhe no Facebook
              </a>
            </li>
            <li class="twitter">
              <a target="_blank" rel="noopener" :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`">
                Compartilhe no Twitter
              </a>
            </li>
            <li class="whatsapp">
              <a target="_blank" rel="noopener" :href="`https://api.whatsapp.com/send?text=${shareTitle}%20.%20Saiba%20mais%20em%20${shareUrl}`">
                Compartilhe no Whatsapp
              </a>
            </li>
            <li class="telegram">
              <a target="_blank" rel="noopener" :href="`https://telegram.me/share/url?url=${shareUrl}&text=${shareTitle}`">
                Compartilhe no Telegram
              </a>
            </li>
          </ul>
          <button class="card__flipBtn card__flipBtn--back" @click="toggleShare" v-if="content.verse">flip this</button>
          <button class="card__shareBtn" @click="toggleShare">share this</button>
        </div>
        <button class="card__flipBtn" @click="flipCard" v-if="content.verse">flip this</button>
        <button class="card__shareBtn" @click="toggleShare">share this</button>
      </div>
      <div class="card__back" v-if="content.verse">
        <Chart
          :content="content.verse"
          :visibility="isFlipped ? 'visible' : ''"
        />
        <button class="card__flipBtn card__flipBtn--back" @click="flipCard">flip this</button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './Chart.vue';

export default {
  name: 'Card',
  props: {
    content: Object,
    width: Number,
  },
  components: {
    Chart,
  },
  data() {
    return {
      isFlipped: false,
      showShare: false,
    }
  },
  computed: {
    shareUrl() {
      if (this.content.verse) {
        return encodeURIComponent(`${window.location.origin}/#/card/${this.content.id}?source=resume`);
      }
      return encodeURIComponent(`${window.location.origin}/#/card/${this.content.id}?source=editorial`);
    },
    shareTitle() {
      const cleanTitle = this.content.frontHTML.replace(/(<([^>]+)>)/ig, '');
      return encodeURI(cleanTitle);
    },
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    toggleShare() {
      this.showShare = !this.showShare;
    },
    shareFacebook() {
      let facebookLink = '';
      if (this.content.verse) {
        facebookLink = `${window.location.href}?source=resume`;
      } else {
        facebookLink = `${window.location.href}?source=editorial`;
      }
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${facebookLink}`, "pop", "width=600, height=400, scrollbars=no");
    }
  },
};
</script>

<style lang="scss">
.card {
  float: left;
  padding: 0 0.5%;
  height: 470px;
  width: 100%;
  perspective: 1000px;

  @media (min-width: 769px) {
    padding: 0 0.2%;
    height: 380px;
  }
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
  color: $white;
  text-align: left;
}

.card__front .front__content {
  font-size: 2.4em;
  font-weight: 300;
}

.card__front .front__content p::selection{
  background: transparent;
}

.card__front .front__content strong::selection{
  background: transparent;
}

.front__content .svg-icon + p {
  font-size: 0.85em;
}

.card__front strong {
  font-weight: 700;
}

.card__back {
	transform: rotateY(180deg);
  background-color: $grayLight;
  overflow: hidden;
}

.card__flipBtn{
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  background-image: url('../assets/icon-graph@3x.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 30px;
  height: 30px;
  border: 0;
  font-size: 0;
}

.card__shareBtn{
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  background-image: url('../assets/icon-share@3x.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 30px;
  height: 31px;
  border: 0;
  font-size: 0;
}

.card__share {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: 14px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: opacity 250ms;
  text-align: center;
  z-index: 1;

    &.open {
      padding: 50px 30px;
      max-height: 1000px;
      opacity: 1;

      .card__flipBtn--back {
        background-image: url('../assets/icon-close-w@3x.png');
      }
      .card__shareBtn {
        background-image: url('../assets/icon-share-w@3x.png');
      }
    }
}

.card__share h3 {
  font-weight: 300;
  font-size: 2em;
}

.card__share ul {
  list-style: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.card__share ul li {
  display: inline-block;
  width: 49.5%;
  text-align: left;
  padding-left: 5px;

  &:nth-of-type(odd) {
    text-align: right;
    padding-left: 0;
    padding-right: 5px;
  }
  &.facebook a {
    background-image: url('../assets/share-facebook.svg');
  }
  &.twitter a {
    background-image: url('../assets/share-twitter.svg');
  }
  &.whatsapp a {
    background-image: url('../assets/share-whatsapp.svg');
  }
  &.telegram a {
    background-image: url('../assets/share-telegram.svg');
  }
}

.card__share ul li a {
  display: inline-block;
  width: 81px;
  height: 81px;
  font-size: 0;
  border-radius: 50%;
  background-size: 100% auto;
  background-repeat: no-repeat;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.card__flipBtn--back {
  background-image: url('../assets/icon-back@3x.png');
}
</style>
