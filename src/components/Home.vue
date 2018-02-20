<template>
  <div id="home">
    <div id="hero-quote">
      <div id="hero-saying">
        “{{randomQuote.saying}}”
      </div>
      <div id="hero-author">
        {{randomQuote.author}}
      </div>
    </div>
    <div id="new-random">
      <i alt="Get new random quote" class="fa fa-random" v-on:click="reload" ></i>
    </div>
  </div>
</template>

<script>
import db from './FirebaseInit.js'
export default {
  name: 'home',
  data () {
    return {
      quotes: [],
      randomQuote: {}
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
      this.randomQuote = this.quotes.length ? this.quotes[Math.floor(Math.random() * this.quotes.length)] : {}
    })
  },
  methods: {
    reload () {
      this.randomQuote = this.quotes.length ? this.quotes[Math.floor(Math.random() * this.quotes.length)] : {}
    }
  }
}
</script>

<style scoped>
  div#hero-quote {
    margin: 2rem;
  }
  div#hero-saying {
    font-size: 3rem;
    line-height: 3.4rem;
  }

  div#hero-author {
    margin-top: 1rem;
    font-family: 'Kalam', cursive; 
    text-align: right;
    font-size: 1.4rem;
  }
    
  div#hero-author::before {
    content: '-';
  }

  #new-random {
    margin: 0 3rem;
    font-size: 1.5rem;
    text-align: right;
  }

  #new-random > i:hover {
    cursor: pointer;
    color: lightblue;
  }
</style>