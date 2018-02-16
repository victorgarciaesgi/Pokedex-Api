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

let HTTP;


export const store = new Vuex.Store({
  state: {
    sessionChecked: false,
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
      return id => state.pokemonList.find(element => {
        return Number(element.Number) === Number(id)
      });
    },
    getMyPokemon(state, getters) {
      return id => getters.getMyPokemons.find(element => {
        return element.Id === id;
      });
    },
    getMyPokemons(state, getters) {
      return state.userPokemons.map(elem => {
        let pokemon = getters.getPokemon(elem.Number);
        elem = Object.assign({},pokemon, {
          Name2: elem.Name,
          Level: elem.Level,
          Id: elem.Id
        });
        return elem;
      });
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
      defaultHeader();
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
      context.commit('updateListPokemons', data);
      console.log(data);
      context.state.fetching = false;
    },
    async fetchMyPokemons(context) {
      context.state.fetching = true;
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
        context.commit('updateMyPokemons', data);
        context.dispatch('addNotification', {type: 'success', message:'Pokemon ajouté à votre pokédex'});
        console.log(data);
      }
      return true;
    },
    async editPokemon(context, {form, pokemon}) {
      console.log(pokemon, form);
      let {data} = await HTTP.put(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons/${pokemon}`, form);
      if (data) {
        context.commit('updateMyPokemons', data);
        context.dispatch('addNotification', {type: 'success', message:'Pokemon édité'});

        console.log(data);
      }
      return true;
    },
    async deletePokemon(context, pokemon) {
      let {data} = await HTTP.delete(`http://localhost:3000/users/victor/pokemons/${pokemon}`);
      if (data) {
        context.commit('updateMyPokemons', data);
        context.dispatch('addNotification', {type: 'success', message:'Pokemon supprimé'});

        console.log(data);
      }
      return true;
    },
    async connexionRequest(context, formData) {
      formData = JSON.stringify(formData);
      formData = JSON.parse(formData);
      console.log(formData)
      let {data} = await HTTP.post('http://localhost:3000/api/login', formData);
      console.log(data);
      if (data) {
        let {user} = await jwtDecode(data);
        jwt.set(data);
        context.commit('connectUser', {user, token: data.token});
        router.push('/mypokemons')
        return true;
      }
      return false;
    },
    disconnectRequest(context) {
      jwt.clear();
      context.commit('disconnectUser');
    },
    async checkUserSession(context) {
      let token = jwt.fetch();
      if (!!token) {
        let {user} = await jwtDecode(token);
        context.commit('connectUser', {user, token});
      } else {
        console.log('User not logged');
      }
      context.state.sessionChecked = true;
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
      "Content-Type": "application/json",
    }
  });
}

const defaultHeader = () => {
  HTTP = axios.create({
    headers: { 
      "Content-Type": "application/json",
    }
  });
}
defaultHeader();