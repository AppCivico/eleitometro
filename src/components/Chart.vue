<template>
  <div class="chart">
    <div class="chart__title" v-html="content.title" />
    <canvas ref="myChartCanvas" width="400" height="400"></canvas>
    <div class="chart__description" v-html="content.description" />
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: {
    content: Object,
  },
  data() {
    return {
      type: {
        linha: 'line',
        barras: 'bar',
      }
    }
  },
  mounted() {
    if (this.content.graph) {
      this.mountChart();
    }
  },
  methods: {
    mountChart() {
      const { graph } = this.content;
      const ctx = this.$refs.myChartCanvas;

      if (graph.points) {
        this.lineChart(ctx, graph);
      }      
    },
    lineChart(ctx, graph) {
      const data = graph.points;
      const labels = data.map((item, i) => `${24 - (24/(i + 1))}h`);

      const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: '',
                data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                lineTension: 0.1,
              },
            ],
          },
          options: {},
        });
    },
  }
}
</script>


