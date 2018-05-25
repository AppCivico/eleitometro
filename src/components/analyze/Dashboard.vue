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
    <div class="dashboard__content">
      <h3>Menções Totais: {{ active.mentions_total }} (+{{ active.mentions_increased }})</h3>
      <div>
        <svg class="svg-icon">
          <use xlink:href="#panorama_robos"></use>
        </svg>
        <h4>Contas automatizadas pelo uso de robôs</h4>
        <span class="value">{{ active.robot_count }} (+{{ active.robot_increased }})</span>
      </div>
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
  },
}
</script>

<style lang="scss">
.dashboard {
  position: relative;
}

.dashboard nav {
  display: block;
  background: #fff;
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
    color: #1771dd;
    border-bottom: 5px solid #1771dd;

    a {
      color: #1771dd;
    }
  }
}

.dashboard nav li a {
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: #66757f;
}

</style>
