<template>
  <div v-if="hasWords">
    <canvas ref='canvas' class='word-cloud' width="400" height="300"></canvas>
  </div>
  <div v-else class='text-center'>
    Create some journal entires to see the word cloud.
  </div>
</template>

<script>
  import WordCloudFrequency from '../services/WordCloudFrequency';

  export default {
    name: 'wordcloud',
    data() {
      return {
        hasWords: true
      }
    },
    mounted() {
      const frequency = new WordCloudFrequency
      const frequencyList = frequency.frequencyList(
        this.$store.state.messages.map( (message) => { return message.body }),
        50, // Top 50 words
      );

      if(frequencyList.length == 0) { 
        this.hasWords = false;
        return
      }

      const sumCoeff = 6; // Arbitrary
      const frequencyValues = frequencyList.map((f) => { return f[1] });
      const listSum = frequencyValues.reduce( (a,b) => { return a + b; }, 0);
      const frequencyMax = frequencyValues.reduce( (a,b) => { return Math.max(a,b) })
      const frequencyMin = frequencyValues.reduce( (a,b) => { return Math.min(a,b) })
      const frequencyCoeff = frequencyMax / 5; // 5 is arbitrary max

      frequencyList.forEach( (item) => {
        item[1] = listSum * sumCoeff / (frequencyList.length) * Math.ceil(item[1] / frequencyCoeff)
      });


      WordCloud(this.$refs.canvas, 
        { 
          list: frequencyList,
          rotationSteps: 10,
          rotateRatio: 0.7
        }
      );
    }
  }
</script>