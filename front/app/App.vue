<template>
  <div id="app">
    <div v-if="$store.state.initializing">
      <h4 class='text-center'>Loading...</h4>
    </div>
    <div v-else>
      <div>
        <navbar></navbar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }

</script>
