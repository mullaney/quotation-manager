<template>
  <div id="view-quote">
    <div id="hero-quote">
      <div id="hero-saying">
        “{{saying}}”
      </div>
      <div id="hero-author">
        {{author}}
      </div>
    </div>
    <div id="admin-buttons">
      <router-link v-bind:to="{name: 'edit-quote', params: {id: quote_id}}" class="button-edit">
        <i class="fa fa-pencil"></i>
      </router-link>
      <button @click="deleteQuote" class="button-delete">
        <i class="fa fa-trash"></i>
      </button>
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
  div#hero-quote {
    margin: 2rem 2rem;
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

  #admin-buttons {
    display: flex;
    margin: 2rem;
    justify-content: flex-end;
  }

  .button-edit, .button-delete {
    margin-left: .4rem;
    border: none;
    padding: 0.4rem 0.8rem;
    color: black;
    border-radius: 0.3rem;
  }

  .button-edit {
    background-color: lightgreen;
  }

  .button-delete {
    background-color: salmon;
  }
</style>
