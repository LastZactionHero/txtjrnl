<template>
  <div>
    <h3>Notifications</h3>
    <form>
    <div class='row'>
      <div class='col-sm-1'></div>
      <div class='col-sm-11'>
        <div class='form-group'>
          <label style='display: block;'>Receive Journaling Prompts by SMS</label>
          <input type="checkbox" checked data-toggle="toggle" ref="toggle" v-model="notifications" data-width="100" data-height="75">
        </div>
         <div class='alert alert-danger' v-if="error">{{error.message}}</div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'settings-notifications',
    data() {
      return {
        notifications: this.$store.state.preferences.notifications,
        error: null
      }
    },
    mounted() {
      // BootstrapToggle needs to be configured and bound manually
      $(this.$refs.toggle).bootstrapToggle({size: 'large'})
      $(this.$refs.toggle).change(function(event) {
        this.error = null;

        this.notifications = $(event.target).prop('checked');

        firebase.database().ref('preferences/' + this.$store.state.user.uid).update({
          notifications: this.notifications
        }).then(function() {
        }).catch(function(error) {
          this.error = error;
        });

      }.bind(this))
    }
  }
</script>
