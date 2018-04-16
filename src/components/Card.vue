<template>
  <div class="card">
    <h1>Card</h1>
    <h2>{{ content.title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    content: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
