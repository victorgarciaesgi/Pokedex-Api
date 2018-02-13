<template>
  <div id="app">
    <HeaderComponent/>
    <router-view/>
  </div>
</template>

<script>

import HeaderComponent from './components/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: inherit;
  flex-flow: inherit;
  justify-content: inherit;
  align-items: inherit;
  align-content: inherit;
}

span {
  padding: 0;
  margin: 0;
}

p{
  display: flex;
  margin: 0;
}

ul, li {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  list-style-type: none;
  user-select: none;
}


</style>
