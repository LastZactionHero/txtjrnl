<template>
  <div class="hello">
    <h2>Welcome, {{ $store.state.user.email }}</h2>
    <div v-if="incompleteProfile">
      <more-info></more-info>
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
