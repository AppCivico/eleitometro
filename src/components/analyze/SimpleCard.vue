<template>
  <section
    class="analyze__card"
    v-if="content"
    v-html="content.frontTHML"
    :style="{backgroundColor: content.backgroundColor}"
    >
  </section>
</template>

<script>
export default {
  name: 'SimpleCard',
  props: {
    content: Object,
  },
}
</script>

<style>
</style>
