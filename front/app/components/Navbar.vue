<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class='navbar-brand'>TxtJrnl</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">         

        </ul>
 
        <ul class="nav navbar-nav navbar-right">
          <li v-if="$store.state.session">
            <router-link to="/statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i> Stats</router-link>
          </li>
          <li v-if="$store.state.session">
            <router-link to="/settings"><i class="fa fa-cog" aria-hidden="true"></i> Settings</router-link>
          </li>
          <li v-if="$store.state.session">
            <a href="javascript:void(0)" v-on:click="signOut"><i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out</a>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import SessionService from '../services/SessionService'

  export default {
    name: 'navbar',
    methods: {
      settings: function() {

      },
      signOut: function() {
        const ss = new SessionService();
        ss.signOut();
      }
    }
  }
</script>