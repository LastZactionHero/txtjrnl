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
        Word Cloud
      </div>
    </div>
  </div>
</template>

<script>
  import TimeOfDayFrequencyChart from './charts/TimeOfDayFrequencyChart'
  import DayOfWeekFrequencyChart from './charts/DayOfWeekFrequencyChart'

  export default {
    name: 'statistics',
    components: {
      "time-of-day-frequency-chart": TimeOfDayFrequencyChart,
      "day-of-week-frequency-chart": DayOfWeekFrequencyChart
    }
  }
</script>