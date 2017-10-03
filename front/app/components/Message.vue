<template>
  <div class='message'>
    <div v-if="message.lastOfDay" class='day-divider'>
      <div class='row'>
        <div class='col-sm-4 line hidden-xs'></div>
        <div class='col-sm-4 col-xs-12'>{{ day }}</div>
        <div class='col-sm-4 line hidden-xs'></div>
      </div>
    </div>
    <div class='row'>
      <div class='col-md-9'>
        <span class='message-body' v-html="messageBody"></span>
        <div v-if="message.media">
          <div v-for="media in message.media">
            <img :src="media.url" />
          </div>
        </div>
      </div>
      <div class='col-md-3'>
        <span class='timestamp'>{{ created_at }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {    
    name: 'message',
    props: ['message'],
    computed: {
      created_at: function() {
        return moment(this.message.created_at).format('h:mm A')
      },
      day:  function() {
        return moment(this.message.created_at).format('MMMM Do YYYY')
      },
      messageBody: function() {
        let b = $('<div/>').append(this.message.body).text()

        let startIndex = 0;
        while((startIndex = b.indexOf('http://', startIndex)) != -1) {
          const endIndex = b.indexOf(' ', startIndex)

          const linkStr = endIndex == -1 ? b.slice(startIndex) : b.slice(startIndex, endIndex)
          b = b.replace(linkStr, `<a href="${linkStr}" target="_blank">${linkStr}</a>`);
          startIndex = b.lastIndexOf('</a>');
        }
        return b;
      }
    }
  }
</script>