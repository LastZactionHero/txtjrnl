<script>
  import { Bar } from 'vue-chartjs';
  export default Bar.extend({
    name: 'time-of-day-frequency-chart',
    data() {
      return {
        messages: this.$store.state.messages
      }
    },
    mounted () {

      const timezone = this.$store.state.preferences.timezone;

      // Get an array of hours each message was posted at, in the user's timezone
      const hourPosted = this.messages.map((message) => { 
        return moment(message.created_at).tz(timezone).hour() 
      });

      let postsCountByHour = Array(24).fill().map((_, hour) => { 
        return hourPosted.filter((i) => { return i == hour }).length
       });

      // Overwriting base render method with actual data.
      const data = {
        labels: [
          '12:00 AM', 
          '-', 
          '2:00 AM', 
          '-',
          '4:00 AM', 
          '-',
          '6:00 AM', 
          '-', 
          '8:00 AM', 
          '-',
          '10:00 AM', 
          '-',
          '12:00 PM', 
          '-', 
          '2:00 PM', 
          '-',
          '4:00 PM', 
          '-',
          '6:00 PM', 
          '-', 
          '8:00 PM', 
          '-',
          '10:00 PM', 
          '-',                   
          ],
        datasets: [
          {
            label: null,
            backgroundColor: '#6FCF97',
            data: postsCountByHour,
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
