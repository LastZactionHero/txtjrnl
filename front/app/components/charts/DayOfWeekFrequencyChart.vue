<script>
  import CommonChart from './CommonChart';
  export default CommonChart.extend({
    name: 'day-of-week-frequency-chart',
    methods: {
      labels() {
        return [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ]
      },
      datasetValues() {
        const timezone = this.$store.state.preferences.timezone;

        // Get an array of days of the week each message was posted at, in the user's timezone
        const dowPosted = this.$store.state.messages.map((message) => { 
          return moment(message.created_at).tz(timezone).day() 
        });

        let postsCountDow = Array(7).fill().map((_, dow) => { 
          return dowPosted.filter((i) => { return i == dow }).length
        });
        return postsCountDow;
      }
    }
  });
</script>
