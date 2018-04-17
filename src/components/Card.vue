<template>
  <div
    class="card"
    :style="{
      width: `${width}%`,
      backgroundColor: content.backgroundColor,
    }"
  >
    <h1>Card</h1>
    <div v-html="content.frontHTML" />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    content: Object,
    width: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .card {
    float: left;
  }
</style>
