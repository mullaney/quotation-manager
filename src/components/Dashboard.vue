<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Quotes</h4></li>
      <li v-for="quote in quotes" v-bind:key="quote.id" class="collection-item">
        {{quote.saying}}
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
  }
}
