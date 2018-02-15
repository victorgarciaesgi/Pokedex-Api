import Vue from 'vue'
import Router from 'vue-router'
import * as Views from '@/components';
import {store} from '../store'


Vue.use(Router);

const Rooter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Liste des pokémons',
      component: Views.PokemonList,
      children: [{
        path: '/pokemon/:id',
        name: '',
        props: true,
        component: Views.PokemonDetail
      }]
    },
    {
      path: '/myPokemons',
      name: 'Mes Pokémons',
      component: Views.MyPokemons,
      children: [{
        path: '/myPokemons/:id',
        name: '',
        props: true,
        meta: {
          user: true
        },
        component: Views.PokemonDetail
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Views.Connexion,
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: Views.Inscription,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

Rooter.beforeEach(async (to, from, next) => {
  if (store.state.sessionChecked) {
    document.title = to.name;
    if (to.meta.requiresAuth) {
      if (store.state.userConnected) {
        next()
      }
      else {
        Rooter.push('/connexion')
      }
    } else {
      next();
    }
  }
  else {
    await Promise.all([
      store.dispatch('checkUserSession'),
      store.dispatch('fetchPokemons')
    ]);
    next();
  }
})

export default Rooter;
