<template>
  <section class="ranking" v-if="content">
    <template v-if="type === 'candidate'">
      <h3>Temas associados ao candidato</h3>
      <div class="ranking__description">Tópicos centrais ao discurso eleitoral do candidato versus os temas mais mencionados em relação ao mesmo na rede</div>
    </template>
    <template v-else-if="type === 'theme'">
      <h3>Candidatos associados ao tema</h3>
      <div class="ranking__description">Em relação ao discurso eleitoral dos candidatos</div>
    </template>
    <template v-else>
      <h3>Temas associados ao panorama</h3>
      <div class="ranking__description">Em relação aos temas mais mencionados</div>
    </template>
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
