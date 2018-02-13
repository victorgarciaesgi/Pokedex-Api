import Vue from 'vue'
import App from './App'
import router from './router'
import * as Elements from 'element-ui';
import Vuex from 'vuex';
import {store} from './store';
import {sync} from 'vuex-router-sync';


Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
