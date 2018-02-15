import Vue from 'vue'
import App from './App'
import router from './router'
import * as Elements from 'element-ui';
import Vuex from 'vuex';
import {store} from './store';
import {sync} from 'vuex-router-sync';


Vue.config.productionTip = false;

sync(store, router);
var event = new Event('lazy');

Vue.directive('lazyload', {
  bind(el, binding, vnode) {
    el.addEventListener('scroll', () => {
      let scrollTop = el.scrollTop + el.offsetHeight;
      let scrollHeight = el.scrollHeight;
      console.log(scrollTop, scrollHeight);
      if (scrollTop >= scrollHeight) {
        event.preventDefault();
        event.stopPropagation();
        el.dispatchEvent(event);
      }
    });
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
