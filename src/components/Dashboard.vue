<template>
  <div id="dashboard">
    <div class="action-button">
      <router-link to="/new">
        <i class="fa fa-plus "></i>
      </router-link>
    </div>
    <h3>List of Quotes</h3>
    <ul>
      <li v-for="quote in quotes" v-bind:key="quote.id">
        <router-link v-bind:to="{ name: 'view-quote', params: { quote_id: quote.id }}">
          “{{abbreviateSaying(quote)}}”
        </router-link>
         - <em>{{quote.author}}</em>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './FirebaseInit.js'
export default {
  name: 'dashboard',
  data () {
    return {
      quotes: []
    }
  },
  created () {
    db.collection('Quotes').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'saying': doc.data().saying,
          'author': doc.data().author
        }
        this.quotes.push(data)
      })
    })
  },
  methods: {
    abbreviateSaying (quote) {
      return quote.saying.slice(0, quote.saying.lastIndexOf(" ", 25)) + '...'
    }
  }
}
</script>

<style scoped>
div#dashboard {
  margin: 1rem 2rem;
}

div.action-button {
  float: right;
}

h3 {
  margin-bottom: .5rem;
}

ul {
  list-style: none;
  margin: 1rem;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}

a {
  color: black;
}

a:hover {
  cursor: pointer;
  color: lightblue;
}

</style>
