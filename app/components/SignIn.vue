<template>
  <div class='row'>
    <div class='col-md-8 col-md-offset-2'>
      <div class='panel panel-default'>
        <div class='panel-heading'>
          <h2 v-if="action == 'sign_in'">Sign In</h2>
          <h2 v-if="action == 'sign_up'">Sign Up</h2>
        </div>
        <div class='panel-body'>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            </div>
            <div class='alert alert-danger' v-if="error">
              {{error.message}}
            </div>
            <button type="submit" class="btn btn-default" v-on:click="signIn" :disabled=isDisabled>
              <span v-if="action == 'sign_in'">Sign In</span>
              <span v-else>Sign Up</span>
            </button>
            <hr/>
            <div v-if="action == 'sign_in'">
              <a href='javascript:void(0)' v-on:click="toggleMode">New to Txtjrnl? Sign up for an account.</a>
            </div>
            <div v-if="action == 'sign_up'">
              <a href='javascript:void(0)' v-on:click="toggleMode">Already have an account? Sign in.</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SessionService from '../services/SessionService';

  export default {
    name: 'sign_in',
    data() {
      return {
        action: 'sign_in',
        email: '',
        password: '',
        submitting: false,
        error: null
      }
    },
    computed: {
      isDisabled() {
        return this.submitting || this.email.length == 0 || this.password.length == 0
      }
    },
    methods: {
      toggleMode() {
        if(this.action == 'sign_in') {
          this.action = 'sign_up';
        } else {
          this.action = 'sign_in';
        }
      },
      signIn() {
        this.submitting = true;
        this.error = null;

        var sessionService = new SessionService();
        if(this.action == 'sign_in') {
          sessionService.signIn(this.email, this.password, function(error) {
            this.error = error;
            this.submitting = false;
          }.bind(this));
        } else {
          sessionService.signUp(this.email, this.password, function(error) {
            this.error = error;
            this.submitting = false;
          }.bind(this));
        }
      }
    }
  }
</script>