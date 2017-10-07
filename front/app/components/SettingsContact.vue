<template>
  <form>
    <h3>Contact Info</h3>

    <div class='row'>
      <div class='col-sm-1'></div>
      <div class='col-sm-11'>
        <div class='form-group'>
          <label for='email'>Email</label>
          <input type="email" class="form-control" id="email" v-model="email">
        </div>

        <div class="form-group">
          <label for="phone_number">Phone Number</label>
            <!-- <!-- <div class='col-xs-1 text-right country-prefix'>+1</div> -->
            <!-- <div class='col-xs-11'> -->
          <div class='phone-number-with-prefix-wrapper'>
            <input type="text" class="form-control phone-number-with-prefix" id="phone_number" placeholder="Phone Number" v-model="phoneNumber">
            <span class='prefix'>+1</span>
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

        <div class='alert alert-success' v-if="success">Your contact info was updated.</div>
        <div class='alert alert-danger' v-if="error">{{error.message}}</div>

        <div class='text-right'>
          <button type="submit" class="btn btn-primary btn-lg" v-on:click="save" :disabled="isDisabled">Save</button>
        </div>

      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'settings-contact',
    data() {
      return {
        email: this.$store.state.user.email,
        phoneNumber: this.$store.state.preferences.phoneNumber,
        timezone: this.$store.state.preferences.timezone,
        submitting: false,
        error: null,
        success: false,
        tzOptions: moment.tz.names().map((tzName) => { return { name: tzName.replace(/_/g, ' '), value: tzName } })
      }
    },
    computed: {
      isDisabled() {
        return this.submitting;  // || !this.phoneNumber || this.phoneNumber.length == 0
      }
    },
    methods: {
      save(event) {
        event.preventDefault();
        this.submitting = true;
        this.error = null;
        this.success = false;

        this.updateEmail();
      },

      updateEmail() {
        this.$store.state.user.updateEmail(this.email).then(() => {
          this.updatePreferences();
        }).catch( (error) => {
          this.error = error;
          this.submitting = false;
        });
      },

      updatePreferences() {
        const phoneNumberFormatted = '+1' + this.phoneNumber.replace(/[^0-9]/g, '');
        const preferences = {
          phoneNumber: this.phoneNumber,
          phoneNumberFormatted: phoneNumberFormatted,
          timezone: this.timezone
        };

        firebase.database().ref('preferences/' + this.$store.state.user.uid).update(preferences).then(function() {
          this.submitting = false;
          this.success = true;
        }.bind(this)).catch(function(error) {
          this.error = error;
          this.submitting = false;
        });
      }
    }

  }
</script>