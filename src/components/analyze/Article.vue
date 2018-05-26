<template>
  <section class="analyze__article" v-if="content">
    <span class="article__writer">ANÁLISE FGV DAPP</span>
    <!--<h3 v-html="content.title"></h3>-->
    <h3><strong>Jair Bolsonaro</strong> e as mídias sociais</h3>
    <img src="https://www.efsa.europa.eu/sites/default/files/All%20staff%20picture%20new.jpg" alt="remove">
    <!-- <img :src="content.image" alt="article thumbnail" v-if="mediaType === 'image'">
    <div class="video__wrapper">
      <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}?rel=0&amp;controls=0&amp;showinfo=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    -->
    <div class="article__content" v-html="content.description"></div>
    <a :href="content.link" targe="_blank">LER MATÉRIA</a>
  </section>
</template>

<script>
export default {
  name: 'Article',
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
.analyze__article {
  background: $white;
  padding: 20px 0;
  margin-bottom: 30px;
  border-radius: 14px;
  text-align: left;
}

.analyze__article > h3,
.analyze__article .article__content,
.analyze__article .article__writer,
.analyze__article > a {
  padding: 0 30px;
}

.analyze__article > img {
  margin-bottom: 10px;
}

.analyze__article h3 {
  font-size: 2.4em;
  color: $gray;
  font-weight: 300;
  margin-bottom: 20px;
}

.analyze__article h3 strong {
  font-weight: 700;
}

.analyze__article .article__content {
  font-size: 1.4em;
}

.analyze__article .article__writer {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: $gray;
  font-weight: 700;
  display: block;
}

.analyze__article > a {
  font-size: 1.2em;
  color: $gray;
  font-weight: 700;
  margin-top: 20px;
  display: block;
}
</style>
