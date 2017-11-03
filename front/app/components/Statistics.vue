<template>
  <div class='container'>
    <div class='chart'>
      <h2>Time of Day Frequency</h2>    
      <time-of-day-frequency-chart :height="150"></time-of-day-frequency-chart>
    </div>
    <div class='row'>
      <div class='col-md-6'>
        <div class='chart'>
          <h2>Day of Week Frequency</h2>
          <day-of-week-frequency-chart :height="150"></day-of-week-frequency-chart>
        </div>
      </div>
      <div class='col-md-6'>
        <word-cloud></word-cloud>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeOfDayFrequencyChart from './charts/TimeOfDayFrequencyChart'
  import DayOfWeekFrequencyChart from './charts/DayOfWeekFrequencyChart'
  import WordCloud from './WordCloud'

  export default {
    name: 'statistics',
    components: {
      "time-of-day-frequency-chart": TimeOfDayFrequencyChart,
      "day-of-week-frequency-chart": DayOfWeekFrequencyChart,
      "word-cloud": WordCloud
    },
    created: function() {
      mixpanel.track('Viewed Statistics');
    }
  }
</script>