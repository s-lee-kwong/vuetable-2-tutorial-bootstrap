<template>
  <div id="app">
    <img src="./assets/logo.png">
    <my-vuetable :pageAmount="pageAmount"></my-vuetable>
  </div>
</template>

<script>
import MyVuetable from './components/MyVuetable'
import Backup from './components/Backup'

export default {
  name: 'app',
  data() {
    return {
      pageAmount: 6
    }
  },
  components: {
    MyVuetable,
    Backup
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
table.vuetable {
  text-align: left;
}
</style>
