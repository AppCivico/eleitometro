<template>
  <section class="analyze__media" v-if="content">
    <h3 v-html="content.title"></h3>
    <div v-html="content.description"></div>
  </section>
</template>

<script>
export default {
  name: 'Media',
  props: {
    content: Object,
  },
}
</script>

<style>
</style>
