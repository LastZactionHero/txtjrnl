<template>
  <div class="hello">
    <div v-if="incompleteProfile">
      <more-info></more-info>
    </div>
    <div v-else>
      <h3>Your Entries</h3>
      <ul class='messages'>
        <li v-for="message in $store.state.messages" class='message'>
          {{ message.body }}
          <div v-if="message.media">
            <div v-for="media in message.media">
              <img :src="media.url" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MoreInfo from './MoreInfo';
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
      'sign-in': SignIn
    },
    methods: {
    }
  }

</script>
