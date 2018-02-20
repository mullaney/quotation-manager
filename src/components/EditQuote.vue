<template>
  <form @submit.prevent="updateQuote" class="col s12">
    <h3>Edit Quote</h3>
    <label class="active">Saying</label>
    <input type="text" v-model="saying" required />
    <label class="active">Author</label>
    <input type="text" v-model="author" required />
    <button type="submit" class="btn">Submit</button>
    <button class="cancel-button" v-on:click="cancel">Cancel</button>
  </form>
</template>

<script>
import db from "./FirebaseInit";
export default {
  name: "edit-quote",
  data() {
    return {
      quote_id: null,
      saying: null,
      author: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("Quotes")
      .doc(to.params.quote_id)
      .get()
      .then(doc => {
        next(vm => {
          vm.quote_id = doc.id;
          vm.saying = doc.data().saying
          vm.author = doc.data().author
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData () {
      db
        .collection("Quotes")
        .doc(this.$route.params.quote_id)
        .get()
        .then(doc => {
          this.quote_id = doc.id;
          this.saying = doc.data().saying
          this.author = doc.data().author
        });
    },
    updateQuote () {
      db
        .collection("Quotes")
        .doc(this.$route.params.quote_id)
        .get()
        .then(doc => {
          doc.ref
            .update({
              saying: this.saying,
              author: this.author
            })
            .then(() => {
              this.$router.push({
                name: "view-quote",
                params: { id: this.quote_id }
              });
            });
        });
    },
    cancel () {
      this.$router.push(`/${this.quote_id}`)
    }
  }
};
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

  form button, .cancel-button {
    background-color: lightblue;
    border: none;
    border-radius: 0.3rem;
    padding: 0.4rem 0.8rem;
    margin-right: 0.4rem;
  }

  .cancel-button {
    background-color: lightsalmon;
  }

  a {
    color: black;
  }
</style>