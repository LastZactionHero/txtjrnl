<script>
  import CommonChart from './CommonChart';

  export default CommonChart.extend({
    name: 'time-of-day-frequency-chart',
    methods: {
      labels() {
        return [
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
        ]
      },
      datasetValues() {
        const timezone = this.$store.state.preferences.timezone;

        // Get an array of hours each message was posted at, in the user's timezone
        const hourPosted = this.$store.state.messages.map((message) => { 
          return moment(message.created_at).tz(timezone).hour() 
        });

        let postsCountByHour = Array(24).fill().map((_, hour) => { 
          return hourPosted.filter((i) => { return i == hour }).length
        });
        return postsCountByHour;
      }
    }
  });
</script>
