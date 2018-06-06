<template>
  <section class="dashboard" v-if="content">
    <nav>
      <ul>
        <li @click.prevent="changeSection('period1')" :class="`${activeSection === 'period1' ? 'active' : ''}`"><a href="#">HOJE</a></li>
        <li @click.prevent="changeSection('period7')" :class="`${activeSection === 'period7' ? 'active' : ''}`"><a href="#">7 DIAS</a></li>
        <li @click.prevent="changeSection('period30')" :class="`${activeSection === 'period30' ? 'active' : ''}`"><a href="#">30 DIAS</a></li>
      </ul>
    </nav>
    <Chart :content="chartContent" :visibility="loadChart"/>
    <h3>Menções Totais: <span>{{ formatNumber(active.mentions_total) }} ({{ active.mentions_increased > 0 ? '+' : ''}}{{ active.mentions_increased }}%)</span></h3>
    <div class="dashboard__robots">
      <svg class="svg-icon">
        <use xlink:href="#panorama_robos"></use>
      </svg>
      <h4>Contas automatizadas pelo uso de robôs</h4>
      <span class="value">{{ formatNumber(active.robot_count) }} ({{ active.robot_increased > 0 ? '+' : ''}}{{ active.robot_increased }}%)</span>
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
        },
      };
      return data;
    },
  },
  methods: {
    changeSection(section) {
      this.activeSection = section;
      this.loadChart = 'reload';
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
