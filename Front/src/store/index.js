import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import {timeout} from '../utils';
import {sortBy, merge} from 'lodash';
import jwtDecode from 'jwt-decode';
import router from '../router'
import * as jwt from './jwt';

Vue.use(Vuex);

const TIMEOUT = 5000;

const headers = () => {
  let authToken = "";
  const userState = store.state;
  if (userState.userConnected) {
    authToken = { "Authorization": `Bearer ${userState.token}`}
  }
  return authToken;
}


export const store = new Vuex.Store({
  state: {
    userConnected: false,
    pokemonList: [],
    userInfos: {
      // name: 'Victor',
    },
    token: null,
    userPokemons: [],
    search: '',
    fetching: false,
    notificationCount: 0,
    notificationList: []
  },
  getters: {
    filteredPokemons(state) {
      let list = state.pokemonList.filter(element => {
        let index = element.Name.toLowerCase().indexOf(state.search.toLowerCase());
        return index > -1;
      })
      return list;
    },
    getPokemon(state) {
      return number => state.pokemonList.find(element => Number(element.Number) === Number(number));
    },
    getMyPokemons(state) {
      return state.userPokemons.map(elem => state.getters.getPokemon(elem));
    }
  },
  mutations: {
    connectUser(state, userInfos) {
      state.userInfos = userInfos;
      state.userConnected = true;
    },
    disconnectUser(state) {
      state.userConnected = false;
    },
    updateListPokemons(state, list) {
      state.pokemonList = list;
    },
    updateMyPokemons(state, list) {
      state.userPokemons = list;
    },
    disconnectUser(state) {
      state.userConnected = false;
      state.userInfos = {};
      state.userPokemons = [];
      router.push('/');
    },
    addAlert(state, alert) {
      state.notificationList.push(alert);
      state.notificationCount++;
    },
    deleteAlert(state, alert) {
      var index = state.notificationList.findIndex(element => element.id === alert.id);
      if (index !== -1) {
        state.notificationList.splice(index, 1);
      }
    }
  },
  actions: {
    async fetchPokemons(context) {
      context.state.fetching = true;
      let {data} = await axios.get('http://localhost:3000/pokemons');
      context.dispatch('addNotification', {type: 'error', message:'Erreur'})
      context.commit('updateListPokemons', data);
      console.log(data);
      context.state.fetching = false;
    },
    async fetchMyPokemons(context) {
      context.state.fetching = true;
      let {data} = await axios.get(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, {
        headers: header()
      });
      if (data) {
        context.commit('updateMyPokemons', data);
        console.log(data);
        context.state.fetching = false;
      }
      return true;
    },
    async addPokemon(context, pokemon) {
      let {data} = await axios.post(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon, {
        headers: header()
      });
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async editPokemon(context, pokemon) {
      let {data} = await axios.put(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon, {
        headers: header()
      });
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async deletePokemon(context, pokemon) {
      let {data} = await axios.delete(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon, {
        headers: header()
      });
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async connexionRequest(context, formData) {
      let {data} = await axios.post('http://localhost:3000/users', formData);
      console.log(data);
      if (data) {
        let userInfos = await jwtDecode(data.jwt);
        context.commit('connectUser', userInfos );
        return true;
      }
      return false;
    },
    disconnectRequest(context) {
      jwt.clear();
      context.commit('disconnectUser');
    },
    async checkUserSession(){
      let token = jwt.fetch();
      if (!!token) {
        let userInfos = await jwtDecode(token);
        context.commit('connectUser', userInfos);
      } else {
        console.log('User not logged');
      }
    },
    async submitRequest(context, formData) {
      let {data} = await axios.post('http://localhost:3000/users', formData);
      console.log(data);
      if (data) {
        return data;
      }
      return false;
    },
    async addNotification(context, alert) {
      alert = merge(alert, {
        id: context.state.notificationCount,
        isNotif: alert.isNotif || false
      })
      context.commit('addAlert',alert);
      await timeout(TIMEOUT);
      context.commit('deleteAlert', alert);
    }
  },

})