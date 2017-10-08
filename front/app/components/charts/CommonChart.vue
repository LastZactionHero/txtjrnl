<script>
  import { Bar } from 'vue-chartjs';
  export default Bar.extend({
    name: 'common-chart',
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              backgroundColor: '#6FCF97', // color-de-york
              data: []
            }
          ]
        }
      }
    },
    mounted () {      
      const data = this.chartData;
      data.labels = this.labels();
      data.datasets[0].data = this.datasetValues(); // Specific implementation

      const options = {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            barPercentage: 1.0,
            categoryPercentage: 0.9
          }]
        }
      };
      this.renderChart(data, options);
    }
  });
</script>
