<template>
  <div class="hello">
    <div v-if="incompleteProfile">
      <div class='container'>
        <more-info></more-info>
      </div>
    </div>
    <div v-else>
      <div class='new-message-wrapper'>
        <div class='container'>
          <new-message></new-message>
        </div>
      </div>
      <div class='container'>
        <div v-if="$store.state.messages.length == 0" class='no-entries text-center'>
          Send a text message or post above to start your journal.
        </div>
        <ul class='messages'>
          <li v-for="message in $store.state.messages">
            <message v-bind:message="message"></message>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Message from './Message';
  import MoreInfo from './MoreInfo';
  import NewMessage from './NewMessage';
  import SignIn from './SignIn';
  
  export default {
    name: 'hello',
    data() {
      return {
      }
    },
    computed: {
      incompleteProfile() {
        return !this.$store.state.preferences.phoneNumber || !this.$store.state.preferences.timezone;
      }
    },
    components: {
      'more-info': MoreInfo,
      'sign-in': SignIn,
      'message': Message,
      'new-message': NewMessage
    },
    methods: {
    }
  }

</script>
