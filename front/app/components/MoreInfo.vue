<template>
  <div class='row'>
    <div class='col-md-8 col-md-offset-2'>
      <div class='panel panel-default'>
        <div class='panel-heading'>
          <h3>We just need some more info to get started</h3>
        </div>
        <div class='panel-body'>
          <form>
            <div class="form-group">
              <label for="phone_number">Phone Number</label>
              <div class='row'>
                <div class='col-xs-1 text-right country-prefix'>+1</div>
                <div class='col-xs-11'>
                  <input type="text" class="form-control" id="phone_number" placeholder="Phone Number" v-model="phoneNumber">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="timezone">Timezone</label>
              <select class='form-control' v-model="timezone">
                <option v-for="tzOption in tzOptions" v-bind:value="tzOption.value">
                  {{ tzOption.name }}
                </option>
              </select>											
            </div>
            <div class='alert alert-danger' v-if="error">
              {{error.message}}
            </div>
            <button type="submit" class="btn btn-default" v-on:click="save" :disabled="isDisabled">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'more_info',
    data() {
      return {
        phoneNumber: this.$store.state.preferences.phoneNumber,
        timezone: this.$store.state.preferences.timezone || moment.tz.guess(),
        submitting: false,
        error: null,
        tzOptions: moment.tz.names().map((tzName) => { return { name: tzName.replace(/_/g, ' '), value: tzName } })
      }
    },
    computed: {
      isDisabled() {
        return this.submitting || !this.phoneNumber || this.phoneNumber.length == 0
      }
    },
    methods: {
      save() {
        this.submitting = true;
        this.error = null;


        const phoneNumberFormatted = '+1' + this.phoneNumber.replace(/[^0-9]/g, '');

        const preferences = {
          phoneNumber: this.phoneNumber,
          phoneNumberFormatted: phoneNumberFormatted,
          timezone: this.timezone
        };
        firebase.database().ref('preferences/' + this.$store.state.user.uid).update(preferences).then(function() {
          this.$store.commit('preferencesUpdated', preferences);
        }.bind(this)).catch(function(error) {
          // TODO
        })
      }
    }
  }
</script>