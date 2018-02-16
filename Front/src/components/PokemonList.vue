<template>

  <div class='pokemons-container' v-lazyload @lazy='scroll()'>
    <ul v-if='$store.state.pokemonList.length'>
      <PokeCard v-for="pokemon in $store.getters.filteredPokemons.slice(0,limit)"
        :modify='false'
        :key="pokemon.Number"
        :pokemon='pokemon'>
      </PokeCard>
      <div class='lazy' v-if="!lazyDone">
        <img class='loading' src='../assets/loading.svg'>
      </div>
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
  name: 'PokemonList',
  components: {PokeCard},
  data() {
    return {
      limit: 20,
      lazyDone: false,
    }
  },
  methods: {
    scroll() {
      this.limit += 20;
      if (this.limit >= 151) {
        this.lazyDone = true;
      }
    }
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
  overflow-y: auto;
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

  .lazy{ 
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 60px;
      height: 60px;
    }
  }

  .loader img{
    height: 70px;
    height: 70px;;
  }
}

</style>