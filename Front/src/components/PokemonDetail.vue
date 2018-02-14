<template>

  <div class='overlay' @click="$router.push('/')">
    <div class='window' @click.stop>
      <PokemonCard v-if='$store.state.pokemonList.length > 0' :pokemon='getPokemon'></PokemonCard>
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
      document.title = pokemon.Name;
      return pokemon;
    }
  }
}

</script>


<style lang='scss' scoped>

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
    transform: scale(1.3);
  }
}


</style>