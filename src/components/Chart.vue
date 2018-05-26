<template>
  <div class="chart">
    <h3 class="chart__title" v-html="content.title" v-if="content.title"/>
    <template v-if="content.graph">
      <div class="chart__graph">
        <canvas ref="myChartCanvas" width="400" height="200"></canvas>
      </div>
      <hr class="graph__separator">
      <p class="graph__total" v-if="content.total">Total: {{ total }}</p>
    </template>
    <div class="chart__description" v-html="content.description" />
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: {
    content: Object,
    visibility: String,
  },
  data() {
    return {
      firstFlip: true,
    }
  },
  computed: {
    total() {
      return this.content.graph.total.toLocaleString('pt-BR');
    },
  },
  watch: {
    visibility(value) {
      if (value === 'visible' && this.firstFlip) {
        this.firstFlip = false;

        if (this.content.graph){
          setTimeout(() => {
            this.mountChart();
          }, 600);
        }
      }

      if (value === 'reload') {
        if (this.content.graph){
          this.mountChart();
        }
      }
    },
  },
  methods: {
    mountChart() {
      const { graph } = this.content;
      const ctx = this.$refs.myChartCanvas;

      if (graph.type === 'linha') {
        this.lineChart(ctx, graph);
      } else if(graph.type === 'pizza') {
        this.pieChart(ctx, graph);
      } else {
        this.barChart(ctx, graph);
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
              borderColor: 'rgb(244,144,12)',
              lineTension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: false,
            }],
          },
        },
      });
    },
    barChart(ctx, graph) {
      const data = graph.points;
      const labels = data.map((item, i) => `${i}`);

      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              fill: true,
              backgroundColor: 'rgb(244,144,12)',
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: false,
              barThickness: 10,
            }],
          },
        },
      });
    },
    pieChart(ctx, graph) {
      const data = graph.points.map(item => item.value);
      const labels = graph.points.map(item => item.label);

      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                'rgb(244,144,12)',
                'rgb(62, 160, 251)',
              ]
            },
          ],
        },
        options: {
          responsive: true,
          cutoutPercentage: 90,
        },
      });
    },
  }
}
</script>

<style lang="scss">
.chart {
  width: 100%;
  text-align: left;
}

.chart__title {
  font-weight: 300;
  font-size: 2.4em;
}

.chart__description {
  font-size: 1.4em;
}

.chart__graph {
  min-height: 150px;
  margin: 20px 0 10px;
}

.graph__total {
  background: $white;
  color: $gray;
  text-align: center;
  font-size: 1.4em;
  font-weight: 700;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
}

</style>
