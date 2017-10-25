<template>
  <div class='message' v-bind:class="{ 'divider': !this.message.lastOfDay }">
    <div v-if="message.lastOfDay" class='day-divider'>
      <div class='row'>
        <div class='col-sm-4 line hidden-xs'></div>
        <div class='col-sm-4 col-xs-12'>{{ day }}</div>
        <div class='col-sm-4 line hidden-xs'></div>
      </div>
    </div>
    <div class='row'>
      <div class='col-md-9'>
        <div v-if="message.recentPrompt" class='prompt'>
          {{ message.recentPrompt.message.message }}
        </div>
        <span class='message-body' v-html="messageBody"></span>
        <div v-if="message.media">
          <div v-for="media in message.media">
            <img :src="media.url" class='media' />
          </div>
        </div>
      </div>
      <div class='col-md-3 text-right'>
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

        // Replace URLs with links
        // Find any urls
        const urlRegexp = new RegExp(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/, 'g');
        let urls = b.match(urlRegexp);

        if(urls && urls.length > 0) {
          // Replace them with links
          urls = $.unique(urls);
          urls.forEach((url) => {
            b = b.replace(new RegExp(url, 'g'), `<a href="${url}" target="_blank">${url}</a>`);
          })
        }


        return b;
      }
    }
  }
</script>