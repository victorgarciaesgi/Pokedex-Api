<template>
  <div id="app">
    <HeaderComponent/>
    <Alerts/>
    <div class='view'>
      <router-view/>
    </div>
  </div>
</template>

<script>

import HeaderComponent from './components/Header.vue'
import Alerts from './components/Alerts.vue'


export default {
  name: 'App',
  components: {
    HeaderComponent, Alerts
  },
  mounted() {
    this.$store.dispatch('checkUserSession');
  }
}
</script>

<style lang='scss'>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.view {
  position: relative;
  flex-flow: column nowrap;
  left: 0;
  top: 50px;
  min-width: 100%;
  max-width: 100%;
  display: flex;
  background-color: rgb(61, 61, 61);
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: calc(100% - 50px);
}

.input-form {
  position: relative;
  background-color: rgb(220,220,220);
  color: rgb(70,70,70);
  height: 40px;
  padding: 5px 30px 5px 9px;
  margin: 5px 0 5px 0;
  width: 100%;
  line-height: 30px;
  font-size: 15px;
  border-radius: 3px;

  &:focus{
    background-color: rgb(225,225,225);
    &~ .input-icon-contain .input-icon /deep/ svg {
      fill: rgb(60,60,60);
    }
  }
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

*{
  box-sizing: border-box;
}

input, textarea, button {
  display: flex;
  outline: none;
  border: none;
  background: none;
  resize: none;
  font-family: 'Open Sans', sans-serif;
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
