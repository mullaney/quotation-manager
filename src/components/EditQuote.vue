<template>
  <div id="edit-quote">
    <h3>Edit Quote</h3>
    <div class="row">
      <form @submit.prevent="updateQuote" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="saying" required />
            <label class="active">Saying</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="author" required />
            <label class="active">Author</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./FirebaseInit";
export default {
  name: "edit-quote",
  data() {
    return {
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
    fetchData() {
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
    updateQuote() {
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
    }
  }
};
</script>