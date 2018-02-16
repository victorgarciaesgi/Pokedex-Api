import Vue from 'vue'
import App from './App'
import router from './router'
import * as Elements from 'element-ui';
import Vuex from 'vuex';
import {store} from './store';
import {sync} from 'vuex-router-sync';


Vue.config.productionTip = false;


sync(store, router);

const emit = (vnode, name, data) => {
  var handlers = vnode.data.on;
  if (handlers && handlers.hasOwnProperty(name)) {
    var handler = handlers[name];
    var fn = handler.fns || handler.fn;
    if (typeof fn === 'function') {
      fn(data);
    }
  }
} 

Vue.directive('lazyload', {
  bind(el, binding, vnode) {
    el.addEventListener('scroll', () => {
      let scrollTop = el.scrollTop + el.offsetHeight;
      let scrollHeight = el.scrollHeight;
      
      if (scrollTop >= scrollHeight) {
        event.preventDefault();
        event.stopPropagation();
        emit(vnode, 'lazy')
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
