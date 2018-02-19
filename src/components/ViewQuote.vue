<template>
  <div id="view-quote">
    <div class="big-quote">“{{saying}}”</div>
    <div class="author">{{author}}</div>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteQuote" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-quote', params: {id: quote_id}}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './FirebaseInit'
export default {
  name: 'view-quote',
  data () {
    return {
      quote_id: null,
      saying: null,
      author: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('Quotes').doc(to.params.quote_id).get()
      .then(doc => {
        next(vm => {
          vm.quote_id = doc.id
          vm.saying = doc.data().saying
          vm.author = doc.data().author
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('Quotes').doc(this.$route.params.quote_id).get()
        .then(doc => {
            this.quote_id = doc.id
            this.saying = doc.data().saying
            this.author = doc.data().author
          })
        
    },
    deleteQuote () {
      if(confirm('Are you sure?')) {
        db.collection('Quotes').doc(this.$route.params.quote_id).get()
          .then(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
      }
    }
  }
}
</script>

<style scoped>
.big-quote {
  margin: 5rem 3rem 1rem 3rem;
  font-size: 2rem;
}

.author {
  margin-bottom: 3rem;
  font-size: 1.4rem;
  display: block;
  text-align: right;
  font-style: italic;
}

.author::before {
  content: '- '
}
</style>
