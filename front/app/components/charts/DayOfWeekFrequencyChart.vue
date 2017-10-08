<script>
  import { Bar } from 'vue-chartjs';
  export default Bar.extend({
    name: 'day-of-week-frequency-chart',
    data() {
      return {
        messages: this.$store.state.messages
      }
    },
    mounted () {
      const timezone = this.$store.state.preferences.timezone;

      // Get an array of days of the week each message was posted at, in the user's timezone
      const dowPosted = this.messages.map((message) => { 
        return moment(message.created_at).tz(timezone).day() 
      });

      let postsCountDow = Array(7).fill().map((_, dow) => { 
        return dowPosted.filter((i) => { return i == dow }).length
       });

      // Overwriting base render method with actual data.
      const data = {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
                          
        ],
        datasets: [
          {
            label: null,
            backgroundColor: '#6FCF97',
            data: postsCountDow,
          }
        ]
      };
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
      this.renderChart(data, options)
    }
  });
</script>
