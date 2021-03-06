<template>
  <div class="chart">
    <h3 class="chart__title" v-html="content.title" v-if="content.title"/>
    <template v-if="content.graph">
      <div class="chart__graph">
        <canvas ref="myChartCanvas" width="400" :height="chartHeight"></canvas>
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
      chartHeight: 0,
    }
  },
  computed: {
    total() {
      if (this.content.graph.total) {
        return this.content.graph.total.toLocaleString('pt-BR');
      }
      return null
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
  mounted() {
    if (window.outerWidth <= 768) {
      this.chartHeight = this.content.graph.type === 'pizza' ? 200 : 300;
    } else {
      if (this.$route.name === 'Resumo') {
        this.chartHeight = this.content.graph.type === 'pizza' ? 120 : 150;
      } else {
        this.chartHeight = this.content.graph.type === 'pizza' ? 120 : 200;
      }
    }
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
    createDatasets(points) {
      const colors = [
        'rgb(244,144,12)',
        'rgb(62, 160, 251)',
        'rgb(51, 204, 102)',
        'rgb(249, 78, 99)',
        'rgb(11, 82, 147)',
        'rgb(14, 122, 50)',
        'rgb(132, 9, 24)',
      ];

      const lines = [];
      const labels = [];
      let i = 0;
      points.map(item => {
        if (lines.findIndex((linesItem) => linesItem.label === item.line) === -1) {
          const data = {
            label: item.line,
            data: points.filter((subitem) => subitem.line === item.line).map(item2 => item2.value),
            fill: false,
            borderColor: colors[i],
            backgroundColor: colors[i],
            lineTension: 0.1,
            pointRadius: window.outerWidth <= 768 ? 4 : 3,
          };
          i = i + 1;
          lines.push(data);
          labels.push(points.filter((subitem) => subitem.line === item.line).map(item2 => item2.label));
        }
      });

      const value = {
        lines,
        labels,
      };
      return value;
    },
    lineChart(ctx, graph) {
      const isMultiple = graph.points[0].line ? true : false;
      let datasets = [];
      let labels = [];

      if (isMultiple) {
        const data = this.createDatasets(graph.points);
        datasets = data.lines;
        labels = data.labels[0];
      } else {
        labels = graph.points.map(item => item.label);
        datasets = [
          {
            label: '',
            data: graph.points.map(item => item.value),
            fill: false,
            borderColor: graph.color ? graph.color : 'rgb(244,144,12)',
            lineTension: 0.1,
            pointRadius: window.outerWidth <= 768 ? 4 : 3,
          },
        ];
      }

      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const value = tooltipItem.yLabel;
                if (value < 10) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += `${Math.round(value * 100) / 100}%`;
                  return label;
                }

                if (value > 999) {
                  return `${Math.round(value/1000)}k`
                }
                return value
              },
            },
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
      });

      if (isMultiple) {
        this.legends = myChart.generateLegend();
      }
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
                },
                autoSkip: false,
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
                },
                autoSkip: false,
              }
            }],
          },
        },
      });
    },
    pieChart(ctx, graph) {
      const data = graph.points.map(item => item.value);
      const labels = graph.points.map(item => item.label);
      const total = graph.total;

      if (total) {
        Chart.pluginService.register({
          beforeDraw(chart) {
            if (chart.config.type === 'doughnut') {
              const width = chart.chart.width;
              const height = chart.chart.height;
              const ctx = chart.chart.ctx;

              ctx.restore();

              const formated = `${chart.options.total}`;
              const label = 'Total:';
              const labelX = Math.round((width - ctx.measureText(label).width) / 2);
              const labelY = height / 3;
              var formatedTotal = formated.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
              var totalX = Math.round((width - ctx.measureText(formatedTotal).width) / 2);
              const totalY = height / 2.1;
              const fontSize = (height / 100).toFixed(2);

              ctx.font = `${fontSize}em RobotoSlab, serif`;
              ctx.fillStyle = '#66757f';
              ctx.textBaseline = "top";
              ctx.fillText(label, labelX, labelY);
              ctx.fillText(formatedTotal, totalX, totalY);
              ctx.save();
            }
          }
        });
      }

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
          total,
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
  font-size: 2em;
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
  text-align: center;
}

.chart__legends li {
  display: inline-block;
  font-size: 1.4em;
  margin: 0 5px;
}

.chart__legends li span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
}
</style>
