<template>
  <form>
    <h3>Password</h3>

    <div class='row'>
      <div class='col-sm-1'></div>
      <div class='col-sm-11'>

        <div class='form-group'>
          <label for='password'>Change Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>

        <div class='form-group'>
          <label for='password-confirm'>Change Password (Confirm)</label>
          <input type="password" class="form-control" id="password-confirm" v-model="passwordConfirm">
        </div>

        <div class='alert alert-success' v-if="success">Your password was updated.</div>

        <div class='alert alert-danger' v-if="error">
          {{error.message}}
        </div>

        <div class='alert alert-danger' v-if="passwordMismatch">
          Passwords do not match.
        </div>


        <div class='text-right'>
          <button type="submit" class="btn btn-primary btn-lg" v-on:click="save" :disabled="isDisabled">Save</button>
        </div>
      </div>

    </div>
  </form>
</template>

<script>
  export default {
    name: 'settings-password',
    data() {
      return {
        password: '',
        passwordConfirm: '',
        error: null,
        success: false,
        submittingPassword: false,
      }
    },
    computed: {
      isDisabled() {
        return this.password.length == 0 || this.password != this.passwordConfirm
      },
      passwordMismatch() {
        return this.password.length > 0 && this.passwordConfirm.length > 0 && this.password != this.passwordConfirm
      }
    },
    methods: {
      save(event) {
        event.preventDefault();
        this.submitting = true;
        this.error = null;
        this.success = false;

        this.$store.state.user.updatePassword(this.password).then(() => {
          this.submitting = false;
          this.success = true;
        }).catch( (error) => {
          this.submitting = false;
          this.error = error;
        });
      }
    }
  }
</script>