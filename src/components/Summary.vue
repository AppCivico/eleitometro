<template>
  <div class="summary">
    <h1>Resumo</h1>
    <Card v-for="card in cards" :key="card.id" :content="card"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Summary',
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          title: 'aaaa',
        },
        {
          id: 2,
          title: 'bbbb',
        },
        {
          id: 3,
          title: 'cccc',
        },
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
