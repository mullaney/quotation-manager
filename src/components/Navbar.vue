<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="brand-logo">Quote Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn"><router-link to="/">Home</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn"><button v-on:click="logout">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'navbar',
  data: function () {
    return {
      isLoggedIn: false,
      currentUser: null
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true,
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
        this.$router.go({ path: this.$router.path })
        })
    }
  }
}
</script>

<style>
  li > button {
    background-color: green;
    color: white;
  }
</style>
