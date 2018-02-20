<template>
  <nav id="navbar">
    <router-link to="/" id="nav-logo">Quotations</router-link>
    <ul>
      <li v-if="isLoggedIn"><router-link to="/">Home</router-link></li>
      <li v-if="isLoggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
      <li v-if="isLoggedIn"><span v-on:click="logout">Logout</span></li>
    </ul>
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

<style scoped>
  #nav-logo {
    font-family: 'Kalam', cursive;
    font-size: 1.5rem;
    color: black;
  }

  #navbar, #navbar > ul {
    display: flex;
    list-style: none;
  }

  #navbar {
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  a {
    color: black;
  }

  li {
    margin-left: 0.6rem;
  }

  a:hover, li:hover, #nav-logo:hover {
    color: lightblue;
  }
</style>
