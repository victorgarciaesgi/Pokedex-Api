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
})

export default Rooter;
