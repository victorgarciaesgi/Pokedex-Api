import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import {timeout} from '../utils';
import {sortBy} from 'lodash';
import jwtDecode from 'jwt-decode';
import * as jwt from './jwt';




Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    userConnected: true,
    pokemonList: [],
    userInfos: {
      name: 'Victor',
    },
    userPokemons: [],
    search: '',
    fetching: false,
  },
  getters: {
    filteredPokemons(state) {
      let list = state.pokemonList.filter(element => {
        let index = element.Name.toLowerCase().indexOf(state.search.toLowerCase());
        return index > -1;
      })
      return sortBy(list, o => o.Number);
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
    }
  },
  actions: {
    async fetchPokemons(context) {
      context.state.fetching = true;
      let {data} = await axios.get('http://localhost:3000/pokemons');
      context.commit('updateListPokemons', data);
      console.log(data);
      context.state.fetching = false;
    },
    async fetchMyPokemons(context) {
      context.state.fetching = true;
      let {data} = await axios.get(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`);
      if (data) {
        context.commit('updateMyPokemons', data);
        console.log(data);
        context.state.fetching = false;
      }
      return true;
    },
    async addPokemon(context, pokemon) {
      let {data} = await axios.post(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon);
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async deletePokemon(context, pokemon) {
      let {data} = await axios.delete(`http://localhost:3000/users/${context.state.userInfos.name}/pokemons`, pokemon);
      if (data) {
        context.commit('updateListPokemons', data);
        console.log(data);
      }
      return true;
    },
    async connexionRequest(context, formData) {
      let {data} = await axios.post('http://localhost:3000/users/connexion', formData);
      console.log(data);
      if (data) {
        let userInfos = await jwt_decode(data.jwt)
        context.commit('connectUser', userInfos );
        return true;
      }
      return false;
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
    }
  },

})