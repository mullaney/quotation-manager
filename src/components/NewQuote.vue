<template>
  <form @submit.prevent="saveQuote">
  <h3>New Quote</h3>
    <label>Saying</label>
    <input type="text" v-model="saying" required />
    <label>Author</label>
    <input type="text" v-model="author" required />
    <button type="submit">Submit</button>
    <router-link to="/"><button class="cancel-button">Cancel</button></router-link>
  </form>
</template>

<script>
import db from './FirebaseInit'
export default {
  name: 'new-quote',
  data () {
    return {
      saying: null,
      author: null
    }
  },
  methods: {
    saveQuote () {
      db.collection('Quotes').add({
        saying: this.saying,
        author: this.author
      })
      .then(docRef => {
        this.$router.push('/')
      })
      .catch(err => console.error(err))
    }
  }
}
</script>

<style>
  form {
    margin: 2rem auto;
    max-width: 500px;
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
    width: 100%;
    margin-bottom: 1rem;
    border: 1 black solid;
    background-color: rgba(211, 211, 211, 0.557);
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  form button {
    background-color: lightblue;
    border: none;
    border-radius: 0.3rem;
    padding: 0.4rem 0.8rem;
    margin-right: 0.4rem;
  }

  button.cancel-button {
    background-color: lightsalmon;
  }
</style>