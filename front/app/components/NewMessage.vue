<template>
  <div class='new-message'>
    <form v-on:submit="submit">
      <div class='row'>
        <div class='col-sm-10 col-xs-12'>
          <input type='text' class='form-control' placeholder="What's on your mind?" v-model="message"></input>
        </div>
        <div class='col-sm-2 col-xs-12'>
          <button type='submit' class='btn btn-primary' :disabled=isDisabled>Send</button>
        </div>
      </div>
    </form>
    <div class='sms-number'>
      Or send a text message to: <span class='number'>(415) 941-5765</span>
    </div>
     

  </div>
</template>

<script>
  import NewMessageService from '../services/NewMessageService';

  export default {
    name: 'new-message',
    data() {
      return {
        message: ''
      }
    },
    methods: {
      submit() {
        NewMessageService.postNewMessage(this.$store.state.user, this.message);
        this.message = '';
      }
    },
    computed: {
      isDisabled() {
        return this.message.length == 0
      }
    }
  }
</script>