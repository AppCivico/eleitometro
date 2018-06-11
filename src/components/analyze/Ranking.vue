<template>
  <section class="ranking" v-if="content">
    <h3>{{ content.title }}</h3>
    <div class="ranking__description" v-html="content.description"></div>
    <Chart :content="chartContent" :visibility="loadChart"/>
  </section>
</template>

<script>
import Chart from '../Chart.vue';

export default {
  name: 'Ranking',
  props: {
    content: Object,
    type: String,
  },
  components: {
    Chart,
  },
  data() {
    return {
      loadChart: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadChart = 'visible';
    }, 1000);
  },
  computed: {
    chartContent() {
      const data = {
        graph: {
          type: 'barras',
          style: 'horizontal',
          points: this.content.elements
        },
      };
      return data;
    },
  },
  methods: {
    formatNumber(amount) {
      let formated = `${amount}`;

      formated = formated.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

      return formated;
    }
  },
}
</script>

<style lang="scss">
.ranking h3 {
  font-size: 2.4em;
  font-weight: 400;
  margin-bottom: 20px;
  padding: 0 5%;
}

.ranking__description {
  font-size: 1.4em;
  margin-bottom: 20px;
  padding: 0 5%;
}
</style>
