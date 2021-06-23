<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Awesome Exercise 4
        </q-toolbar-title>

        <div>Firebase</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Foods</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/auth"
          v-if="!isUserLoggedIn"
          clickable
          exact>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else @click="logoutUser" clickable>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ labelLogoutButton | niceLabel }}</q-item-label>
          </q-item-section>
        </q-item>        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', [
        'isUserLoggedIn',
        'labelLogoutButton'
      ])
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    openURL
  },
  filters: {
    niceLabel(value) {
      let niceLabel = "Logout " + value
      return niceLabel;
    }
  }
}
</script>

<style>
</style>
