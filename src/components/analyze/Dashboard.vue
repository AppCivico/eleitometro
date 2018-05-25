<template>
  <section class="dashboard" v-if="content">
    <nav>
      <ul>
        <li><a href="#" @click.prevent="changeSection('period1')" :class="`${activeSection === 'period1' ? 'active' : ''}`">HOJE</a></li>
        <li><a href="#" @click.prevent="changeSection('period7')" :class="`${activeSection === 'period7' ? 'active' : ''}`">7 DIAS</a></li>
        <li><a href="#" @click.prevent="changeSection('period30')" :class="`${activeSection === 'period30' ? 'active' : ''}`">30 DIAS</a></li>
      </ul>
    </nav>
    <Chart :content="chartContent" :visibility="loadChart ? 'visible' : ''"/>
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
      loadChart: false,
    };
  },
  computed: {
    active() {
      return this.content[this.activeSection];
    },
    chartContent() {
      const data = {
        graph: {
          type: this.activeSection.graph_type,
          points: this.activeSection.points,
          total: this.activeSection.mentions_total,
        },
      };
      return data;
    },
  },
  methods: {
    changeSection(section) {
      this.activeSection = section;
      this.loadChart = true;
    },
  },
}
</script>

<style lang="scss">
.dashboard {
  position: relative;
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
  font-size: 1.6em;
  font-weight: 600;
  color: #66757f;
}

</style>
