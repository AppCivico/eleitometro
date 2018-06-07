<template>
  <div class="chart">
    <h3 class="chart__title" v-html="content.title" v-if="content.title"/>
    <template v-if="content.graph">
      <div class="chart__graph">
        <canvas ref="myChartCanvas" width="400" height="200"></canvas>
        <div class="chart__legends" v-if="legends !== ''" v-html="legends"></div>
      </div>
      <template v-if="content.total">
        <hr class="graph__separator">
        <p class="graph__total" v-if="content.total">Total: {{ total }}</p>
      </template>
    </template>
    <div class="chart__description" v-html="content.description" v-if="content.description"/>
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
      legends: '',
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

      if (value.indexOf('reload') > -1) {
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
      const data = graph.points.map(item => item.value);
      const labels = graph.points.map(item => item.label);

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
              gridLines: {
                display: false,
              },
              ticks: {
                callback: function(value, index, values) {
                  if (value.indexOf(':') > -1) {
                    return value.substring(0, value.length - 3)
                  } else if (value.indexOf('/') > -1) {
                    return value.split('/')[0]
                  }
                  return value
                }
              }
            }],
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  if (value > 999) {
                    return `${value/1000}k`
                  }
                  return value
                }
              }
            }],
          },
        },
      })
    },
    barChart(ctx, graph) {
      const data = graph.points.map(item => item.value);
      const labels = graph.points.map(item => item.label);
      const type = graph.style ? 'horizontalBar' : 'bar';

      const myChart = new Chart(ctx, {
        type: type,
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
              gridLines: {
                display: type === 'bar' ? false : true,
              },
              barThickness: 10,
              ticks: {
                callback: function(value, index, values) {
                  if (value > 999) {
                    return `${value/1000}k`
                  }
                  return value
                }
              }
            }],
            yAxes: [{
              gridLines: {
                display: type !== 'bar' ? false : true,
              },
              ticks: {
                callback: function(value, index, values) {
                  if (value > 999) {
                    return `${value/1000}k`
                  }
                  return value
                }
              }
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
                'rgb(51, 204, 102)',
                'rgb(249, 78, 99)',
                'rgb(11, 82, 147)',
                'rgb(14, 122, 50)',
                'rgb(132, 9, 24)',
              ],
              borderColor: 'transparent',
            },
          ],
        },
        options: {
          responsive: true,
          cutoutPercentage: 90,
          legend: {
            display: false,
          }
        },
      });

      this.legends = myChart.generateLegend();
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

.chart__legends {
  margin-top: 10px;
}

.chart__legends ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chart__legends li {
  font-size: 1.4em;
}

.chart__legends li span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
}
</style>
