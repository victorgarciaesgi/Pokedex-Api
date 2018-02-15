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

const headers = {};


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
    connectUser(state, {user, token}) {
      state.userInfos = user;
      state.userConnected = true;
      state.token = token;
      setHeaders(state);
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
      let {data} = await HTTP.get('http://localhost:3000/pokemons');
      context.dispatch('addNotification', {type: 'error', message:'Erreur'})
      context.commit('updateListPokemons', data);
      console.log(data);
      context.state.fetching = false;
    },
    async fetchMyPokemons(context) {
      context.state.fetching = true;
      console.log(HTTP);
      let {data} = await HTTP.get(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`);
      if (data) {
        context.commit('updateMyPokemons', data);
        console.log(data);
        context.state.fetching = false;
      }
      return true;
    },
    async addPokemon(context, pokemon) {
      let {data} = await HTTP.post(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon);
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async editPokemon(context, pokemon) {
      let {data} = await HTTP.put(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon);
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async deletePokemon(context, pokemon) {
      let {data} = await HTTP.delete(`http://localhost:3000/users/victor/pokemons`, pokemon);
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async connexionRequest(context, formData) {
      let {data} = await HTTP.post('http://localhost:3000/api/login', formData);
      console.log(data);
      if (data) {
        let {user} = await jwtDecode(data.token);
        jwt.set(data.token);
        router.push('/mypokemons')
        context.commit('connectUser', {user, token: data.token});
        return true;
      }
      return false;
    },
    disconnectRequest(context) {
      jwt.clear();
      context.commit('disconnectUser');
    },
    async checkUserSession(context){
      let token = jwt.fetch();
      if (!!token) {
        let user = await jwtDecode(token);
        context.commit('connectUser', {user, token});
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

const setHeaders = (state) => {
  HTTP = axios.create({
    headers: { 
      "Authorization": `Bearer ${state.token}`, 
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
}

let HTTP = axios.create({
  headers: { 
    "Authorization": `Bearer azdzaa`, 
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});