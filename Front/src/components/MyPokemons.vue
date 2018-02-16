<template>

  <div class='pokemons-container'>
    <ul v-if='finish'>
      <PokeCard v-for="pokemon in this.$store.getters.getMyPokemons"
        :modify='true'
        :key="pokemon.Id"
        :pokemon='pokemon'>
      </PokeCard>
      <span v-if="!$store.getters.getMyPokemons">Aucun Pokémons</span>
    </ul>
    <div v-else class='loader'>
      <img class='loading' src='../assets/loading.svg'>
    </div>

    <router-view/>
  </div>
  
</template>



<script>

import axios from 'axios';
import PokeCard from './PokemonCard.vue';

export default {
  name: 'MyPokemons',
  components: {PokeCard},
  data() {
    return {
     finish: false
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchMyPokemons');
    this.finish = true;
  }
}

</script>


<style lang='scss' scoped>

.pokemons-container{
  position: relative;
  display: flex;
  padding: 20px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;

  ul {
    display: flex;
    flex-flow: row wrap;
    flex: 1 1 auto;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;    
  }

  .loader img{
    height: 70px;
    height: 70px;;
  }
}

</style>