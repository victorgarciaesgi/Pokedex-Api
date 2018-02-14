import Vue from 'vue'
import Router from 'vue-router'
import * as Views from '@/components';


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
      path: '/connexion',
      name: 'Connexion',
      component: Views.Connexion,
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: Views.Inscription,
    }
  ]
})


Rooter.beforeEach(async (to, from, next) => {
  if (!to.meta.contentProp) {
    document.title = `${to.name}`;
  }
  if (to.meta.requiresAuth) {
    if (LoginStore.state.isLoggedIn) {
      next()
    }
    else {
      LoginStore.mutations.showLoginRoute(to.fullPath);
    }
  } else {
    next();
  }
})

export default Rooter;
