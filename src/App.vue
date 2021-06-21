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
    this.handleUserStateChange()
  }
}
</script>

<style>
</style>
