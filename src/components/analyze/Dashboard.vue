<template>
  <section class="dashboard" v-if="content">
    <nav>
      <ul>
        <li><a href="#" @click.prevent="changeSection('period1')" :class="`${activeSection === 'period1' ? 'active' : ''}`">HOJE</a></li>
        <li><a href="#" @click.prevent="changeSection('period7')" :class="`${activeSection === 'period7' ? 'active' : ''}`">7 DIAS</a></li>
        <li><a href="#" @click.prevent="changeSection('period30')" :class="`${activeSection === 'period30' ? 'active' : ''}`">30 DIAS</a></li>
      </ul>
    </nav>
    <div class="dashboard__section">
      <Chart :content="chartContent" :visibility="loadChart ? 'visible' : ''"/>
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
    chartContent() {
      const activeSection = this.content[this.activeSection];
      const data = {
        graph: {
          type: activeSection.graph_type,
          points: activeSection.points,
          total: activeSection.mentions_total,
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

<style>
.dashboard {
  position: relative;
}
</style>
