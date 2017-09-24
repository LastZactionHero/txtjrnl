<template>
  <div class="hello">
    <div>Welcome, {{ $store.state.user.email }}</div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
      }
    }
  }

</script>
