<template>
  <div id="new-quote">
    <h3>New Quote</h3>
    <div class="row">
      <form @submit.prevent="saveQuote" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="saying" required />
            <label>Saying</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="author" required />
            <label>Author</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
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