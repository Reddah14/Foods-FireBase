<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['handleUserStateChange'])
  },
  mounted() {
      // this hook is triggered when app first loads
    this.handleUserStateChange()
  }
}
</script>

<style>
</style>
