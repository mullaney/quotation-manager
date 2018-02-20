<template>
  <form action="index.html">
    <h3>Login</h3>
    <label for="email">Email Address</label>
    <input type="email" id="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password">
    <button v-on:click="login">Login</button>
  </form>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function(e) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.$router.go({ path: this.$router.path })
      },
      err => {
        alert(err.message)
      })
      e.preventDefault()
    }
  }
}
</script>

<style>
  form {
    margin: 2rem 2rem;
    padding: 2rem;
    box-shadow: 2px 2px 8px black;
  }

  label, input {
    display: block;
  }

  label {
    font-size: 0.8rem;
  }

  input {
    padding: 0.3rem;
    max-width: 100%;
    min-width: 200px;
    margin-bottom: 1rem;
    border: 1 black solid;
    background-color: rgba(211, 211, 211, 0.557);
  }

  h3 {
    margin-bottom: 0.5rem;
  }
</style>
