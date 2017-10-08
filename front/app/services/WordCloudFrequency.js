import StopList from './StopList';

export default class WordCloudFrequency {
  frequencyList(strings, maxWords) {    
    const removeWords = StopList.commonWords();

    const messageWords = strings.map((body) => { 
      return body.split(/\s+/) 
    }).reduce( 
      (a,b) => { return a.concat(b) }, []
    ).map( (word) => {
      return word.replace(/[.,\/#\?!$%\^&\*;:{}=\`~()]/g, '')
    }).filter( (word) => { 
      return word.length > 0 
        && word.indexOf('http') != 0
        && removeWords.indexOf(word.toLowerCase()) == -1         
    });

    const sortedMessageWords = messageWords.sort();

    let list = [];

    let currentWord = null;
    let currentWordCount = 0;
    sortedMessageWords.forEach( (word) => {
      if(currentWord == null || word != currentWord) {
        if(currentWord) { list.push([currentWord, currentWordCount]); }
        currentWord = word;
        currentWordCount = 1;
      } else {
        currentWordCount++;
      }
    });

    // Pick the most common words
    list = list.sort( (a,b) => { return b[1] - a[1] });
    list = list.splice(0, maxWords)
    
    return list
  }
}