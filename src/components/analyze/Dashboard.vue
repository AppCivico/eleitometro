<template>
  <section class="dashboard" v-if="content">
    <nav>
      <ul>
        <li v-if="this.content.period1.points.length > 0" @click.prevent="changeSection('period1')" :class="`${activeSection === 'period1' ? 'active' : ''}`"><a href="#">HOJE</a></li>
        <li @click.prevent="changeSection('period7')" :class="`${activeSection === 'period7' ? 'active' : ''}`"><a href="#">7 DIAS</a></li>
        <li @click.prevent="changeSection('period30')" :class="`${activeSection === 'period30' ? 'active' : ''}`"><a href="#">MÊS</a></li>
      </ul>
    </nav>
    <Chart v-if="chartContent.graph.points.length > 0" :content="chartContent" :visibility="loadChart"/>
    <h3 v-if="active.mentions_total">Menções Totais: <span>{{ formatNumber(active.mentions_total) }} <template v-if="active.mentions_increased"><br>({{ active.mentions_increased > 0 ? '+' : ''}}{{ active.mentions_increased }}% variação)</template></span></h3>
    <div class="dashboard__robots" v-if="active.robot_count">
      <svg class="svg-icon">
        <use xlink:href="#panorama_robos"></use>
      </svg>
      <h4>Contas automatizadas pelo uso de robôs</h4>
      <span class="value">{{ formatNumber(active.robot_count) }} <template v-if="active.robot_increased"><br>({{ active.robot_increased > 0 ? '+' : ''}}{{ active.robot_increased }}% variação)</template></span>
    </div>
  </section>
</template>

<script>
import Chart from '../Chart.vue';

export default {
  name: 'Dashboard',
  props: {
    content: Object,
  },
  components: {
    Chart,
  },
  data() {
    return {
      activeSection: 'period1',
      loadChart: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadChart = 'visible';
    }, 1000);
    if (this.content.period1.points.length <= 0) {
      this.activeSection = 'period7';
    }
  },
  computed: {
    active() {
      return this.content[this.activeSection];
    },
    chartContent() {
      const data = {
        graph: {
          type: this.active.graph_type,
          points: this.active.points,
          total: this.active.mentions_total,
          color: 'rgb(62, 160, 251)',
        },
      };
      return data;
    },
  },
  methods: {
    changeSection(section) {
      this.activeSection = section;
      this.loadChart = `reload ${section}`;
    },
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
