<template>

  <div v-if='$store.state.pokemonList.length > 0' class='overlay' @click="goBack()">
    <div class='window' @click.stop>
      <PokemonCard v-if='!$route.meta.user' v-for="prev in getPokemon.PreviousEvolution"
        class='prev'
        :key="prev.Number"
        :pokemon='Pokemon(prev.Number)'
        />
      <PokemonCard class='center' 
        :modify='$route.meta.user'
        v-if='getPokemon' 
        :pokemon='getPokemon'/>
      <PokemonCard v-if='!$route.meta.user' v-for="next in getPokemon.NextEvolution"
        class='next'
        :key="next.Number"
        :pokemon='Pokemon(next.Number)'
        />
    </div>
  </div>


</template>



<script>

import PokemonCard from './PokemonCard.vue';

export default {
  name: 'PokemonDetail',
  components: {PokemonCard},
  props: ['id'],
  computed: {
    getPokemon() {
      let pokemon;
      if (this.$route.meta.user) {
        pokemon = this.$store.getters.getMyPokemon(this.id);
      } else {
        pokemon = this.$store.getters.getPokemon(this.id);
      }
      if (pokemon) {
        document.title = pokemon.Name;
        return pokemon;
      } else {
        this.$router.push('/');
        return false;
      }
    },
    getRoute() {
      if (this.$route.meta.user) {
        return `/myPokemons/${this.pokemon.Number}`
      }
      return `/pokemon/${this.pokemon.Number}`;
    },
  },
  methods: {
    goBack() {
      if (this.$route.meta.user) {
        this.$router.push(`/myPokemons`);
      } else {
        this.$router.push(`/`);
      }
      
    },
    Pokemon(id) {
      let pokemon = this.$store.getters.getPokemon(id);
      if (pokemon) {
        return pokemon;
      } 
      return false;
    }
  },
}

</script>


<style lang='scss'>

.overlay {
  z-index: 11000;
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  background-color: rgba(10,10,10,0.8);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  .window {
    display: flex;
    flex-flow: row nowrap;

    div.pokemon {
      margin-left: 50px;
    }

    .center {
      transform: scale(1.3);
    }
    
  }
}


</style>