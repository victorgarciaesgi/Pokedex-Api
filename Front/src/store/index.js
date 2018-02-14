import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';


Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    userConnected: false,
    userInfos: null,
    userPokemons: [],
    search: '',
  },
  mutations: {
    connectUser(state, userInfos) {
      state.userInfos = userInfos;
      state.userConnected = true;
    },
    disconnectUser(state) {
      state.userConnected = false;
    },
  },
  actions: {
    async connexionRequest(context, formData) {
      let {data} = await axios.post('route', formData);
      if (data) {
        context.commit('connectUser', data.userInfos);
        return true;
      }
      return false;
    },
    async submitRequest(context, formData) {
      let {data} = await axios.post('route', formData);
      if (data) {
        return true;
      }
      return false;
    }
  },
})