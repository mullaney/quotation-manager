<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
* {
  font-family: 'Source Sans Pro', sans-serif;
  box-sizing: border-box;
  margin: 0;
  font-size: 14pt;
}
a {
  text-decoration: none;
}
</style>
