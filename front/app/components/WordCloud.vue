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

      if(frequencyList.length == 0) { this.hasWords = false }

      WordCloud(this.$refs.canvas, 
        { 
          list: frequencyList,
          // fontFamily: 'Slabo 13px',
          weightFactor: (c) => { 
            return 10 * c;
          },
          rotationSteps: 10,
          rotateRatio: 0.7
        }
      );
    }
  }
</script>