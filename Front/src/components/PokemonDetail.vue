<template>

  <div v-if='$store.state.pokemonList.length > 0' class='overlay' @click="$router.push('/')">
    <div class='window' @click.stop>
      <PokemonCard v-for="prev in getPokemon.PreviousEvolution"
        class='prev'
        :key="prev.Number"
        :pokemon='Pokemon(prev.Number)'
        />
      <PokemonCard class='center' v-if='getPokemon' :pokemon='getPokemon'></PokemonCard>
      <PokemonCard v-for="next in getPokemon.NextEvolution"
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
      let pokemon = this.$store.getters.getPokemon(this.id);
      if (pokemon) {
        document.title = pokemon.Name;
        return pokemon;
      } else {
        this.$router.push('/');
        return false;
      }
    }
  },
  methods: {
    Pokemon(id) {
      let pokemon = this.$store.getters.getPokemon(id);
      if (pokemon) {
        return pokemon;
      } 
      return false;
    }
  }
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