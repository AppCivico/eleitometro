<template>
  <section class="analyze__media" v-if="content">
    <h3 v-html="content.title"></h3>
    <img :src="content.image" alt="article thumbnail" v-if="mediaType === 'image'">
    <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}?rel=0&amp;controls=0&amp;showinfo=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <div v-html="content.description"></div>
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
      return this.content.media.indexOf('youtube') > -1 ? 'video' : 'image';
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

<style>
</style>
