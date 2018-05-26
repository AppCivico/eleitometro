<template>
  <section class="analyze__media" v-if="content">
    <h3 v-html="content.title"></h3>
    <img :src="content.image" alt="article thumbnail" v-if="mediaType === 'image'">
    <div class="video__wrapper">
      <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}?rel=0&amp;controls=0&amp;showinfo=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <div class="media__content" v-html="content.description"></div>
  </section>
</template>

<script>
export default {
  name: 'Media',
  props: {
    content: Object,
  },
  computed: {
    mediaType() {
      if (this.content.media) {
        return this.content.media.indexOf('youtube') > -1 ? 'video' : 'image';
      } else {
        return 'image'
      }
    },
    videoId() {
      if (this.mediaType === 'video') {
        const videoURL = this.content.media.split('?v=');
        return videoURL[1];
      }
    }
  }
}
</script>

<style lang="scss">
.analyze__media {
  background: $white;
  padding: 20px 0;
  margin-bottom: 30px;
  border-radius: 14px;
  text-align: left;
}

.analyze__media > h3,
.analyze__media > img,
.analyze__media .media__content {
  padding: 0 30px;
}

.analyze__media h3 {
  font-size: 2.4em;
  color: $gray;
  font-weight: 300;
  margin-bottom: 20px;
}

.analyze__media h3 strong {
  font-weight: 700;
}

.analyze__media .media__content {
  font-size: 1.4em;
}

.video__wrapper {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
  margin-bottom: 20px;
}

.video__wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
