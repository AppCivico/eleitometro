<template>
  <section class="ranking" v-if="content">
    <Chart :content="chartContent" :visibility="loadChart"/>
  </section>
</template>

<script>
import Chart from '../Chart.vue';

export default {
  name: 'Ranking',
  props: {
    content: Object,
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
.dashboard {
  position: relative;
}

.dashboard nav {
  display: block;
  background: $white;
  margin-left: -12%;
  margin-right: -12%;
}

.dashboard nav ul {
  list-style: none;
}

.dashboard nav li {
  display: inline-block;
  padding: 5px 10px;

  &.active {
    color: $blue;
    border-bottom: 5px solid $blue;

    a {
      color: $blue;
    }
  }
}

.dashboard nav li a {
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: $gray;
}

.dashboard h3 {
  font-size: 2.4em;
  font-weight: 300;
  color: $gray;
  margin: 30px 0;
}

.dashboard h3 span {
  color: $blue;
}

.dashboard__robots {
  background: $white;
  padding: 10px 30px 30px;
  border-radius: 14px;
}

.dashboard__robots h4 {
  font-size: 1.4em;
  font-weight: 400;
  margin-bottom: 10px;
}

.dashboard__robots .value {
  font-size: 2.4em;
  color: $gray;
}
</style>
