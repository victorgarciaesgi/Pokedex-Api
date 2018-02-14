<template>

  <div class='pokemons-container'>

    <ul v-if='pokemonList.length'>
      <PokeCard v-for="pokemon in filteredPokemons" 
        :key="pokemon.Number"
        :pokemon='pokemon'/>
    </ul>
    <div v-else class='loader'>
      <img class='loading' src='../assets/loading.svg'>
    </div>

  </div>
  
</template>



<script>

import axios from 'axios';
import PokeCard from './PokemonCard.vue';
import {sortBy} from 'lodash'

export default {
  name: 'PokemonList',
  components: {PokeCard},
  data() {
    return {
      pokemonList: []
    }
  },
  computed: {
    filteredPokemons() {
      let list = this.pokemonList.filter(element => {
        let index = element.Name.toLowerCase().indexOf(this.$store.state.search.toLowerCase());
        return index > -1;
      })
      return sortBy(list, o => o.Number);
    }
  },
  async mounted() {
    let {data} = await axios.get('http://localhost:3000/pokemons');
    console.log(data);
    this.pokemonList = data;
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


    li {
      position: relative;
      display: flex;
      height: 340px;
      width: 250px;
      background-color: rgb(255, 237, 75);
      padding: 8px;
      margin: 10px;
      border-radius: 5px;

      .container {
        width: 100%;
        box-shadow: inset 0 0 10px rgba(10,10,10,0.3);
        padding: 0 5px 0 5px;

        .title {
          display: flex;
          flex-flow: row nowrap;

          .level {
            display: flex;
            flex: 0 0 auto;
            padding: 5px;
            span {
              background-color: rgb(241, 241, 241);
              box-shadow: 0 0 5px rgba(10,10,10,0.3);
              margin-left: - 15px;
              font-style: italic;
              font-weight: bold;
              padding: 2px 5px 2px 5px;
              border-radius: 5px;
              font-size: 9px;
            }
          }

          .name {
            display: flex;
            align-items: center;
            font-weight: bold;
            text-transform: capitalize;
            flex: 1 1 auto;
          }

          .pv {
            display: flex;
            align-items: flex-end;
            align-self: flex-end;
            flex: 0 0 auto;
            font-size: 13px;
            font-weight: bold;
          }
        }

        .img-container {
          display: flex;
          flex-flow: column wrap;
          border: 3px solid rgb(233, 233, 233);
          border-radius: 5px;
          margin: 5px;

          .img{
            height: 130px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            background-color: rgb(58, 58, 58);
            border-bottom: 3px solid rgb(233, 233, 233);
          }

          .img-info {
            background-color: rgb(233, 233, 233);
            box-shadow: inset 0 0 10px rgba(10,10,10,0.3);
            font-size: 7px;

          }
        }

        &.electrique {
          background-color: rgb(255, 208, 0);
        }

        &.feu {
          background-color: rgb(255, 123, 0);
        }

        &.plante {
          background-color: rgb(99, 238, 81);
        }
      }
      
    }
  }
}

</style>