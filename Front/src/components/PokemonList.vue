<template>

  

</template>



<script>

import axios from 'axios';

export default {
  name: 'PokemonList',
  async created() {
    let {data} = await axios.get('localhost:3000/pokemons');
    console.log(data);
  }
}

</script>


<style lang='scss' scoped>

</style>