<template>
  <transition name='hide'>
    <ul id="alertes-container" v-show='$store.state.notificationList.length'>
      <transition-group name='alert'>
        <li v-for='alert in $store.state.notificationList' :key='alert.id' :type='alert.type'>
          <div class='alert-icon'>
            <img src="~../assets/form-valid.svg" v-if='alert.type == "success"'>
            <img src="~../assets/form-invalid.svg" v-else-if='alert.type == "error"'>
            <img src="~../assets/warning.svg" v-else-if='alert.type == "warning"'>
            <img src="~../assets/infos.svg" v-else-if='alert.type == "alert"'>
          </div>
          <div class='alert-text'>
            <span>{{alert.message}}</span>
          </div>
          <div class='alert-quit' @click="$store.commit('deleteAlert', alert)">
            <img src='~../assets/quit.svg'>
          </div>
        </li>
      </transition-group>
    </ul>
  </transition>
</template>

<script>
import Vue from "vue";

export default {
  name: 'Alerts',
}
</script>



<style lang='scss' scoped>
ul#alertes-container {
  position: fixed;
  top: 50px;
  left: 0;
  padding: 10px;
  width: 380px;
  height: auto;
  z-index: 10001;
  display: flex;
  flex-direction: column;

  li {
    position: relative;
    height: auto;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    margin-top: 5px;
    padding: 15px 10px 15px 0px;
    box-shadow: 0 0 10px rgba(20, 20, 20, 0.2);
    font-size: 14px;
    color: rgb(60,60,60);
    text-align: center;
    font-weight: bold;
    border-radius: 3px;
    background-color: white;
    line-height: 17px;

    div {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;

      &.alert-text {
        flex: 1 1 auto;
      }
      &.alert-icon {
        width: 50px;
        flex: 0 0 auto;
      }
      
      &.alert-quit {
        width: 30px;
        cursor: pointer;
        flex: 0 0 auto;
      }
    }



  }
}

.hide-leave-active {
  transition: all 0.6s;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s;
}
.alert-enter,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

