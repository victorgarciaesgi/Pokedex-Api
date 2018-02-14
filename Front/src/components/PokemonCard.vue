<template>
  <div class='pokemon'>
    <div class='container' :style="{'background-image': `url(${getTexture})`}">
      <div class='title'>
        <span class='level'>
          <span>NIVEAU {{pokemon.level}}</span>
        </span>
        <span class='name'>{{pokemon.name}}</span>
        <span class='pv'>90<span>pv</span></span>
        <span class='type' :style="{backgroundPosition: getIcon}"></span>
      </div>
      <div class='img-container'>
        <div class='img' :style="{'background-image': `url(${pokemon.img})`}"></div>
        <div class='img-info'>n°378 Pokémon truc Taille: 2cm  Poids: 10kg</div>
      </div>
      <div class='infos'>
        
      </div>
    </div>
  </div>  
</template>



<script>

import axios from 'axios';

export default {
  name: 'PokemonCard',
  props: [
    'pokemon'
  ],
  data() {
    return {
      types: [
        "normal",
        "grass",
        "psychic",
        "fire",
        "fighting",
        "water",
        "electric"
      ]
    }
  },
  computed: {
    getTexture() {
      return require(`../assets/PokemonTextures/${this.pokemon.type}.png`)
    },
    getIcon() {
      let type = this.types.indexOf(this.pokemon.type);
      console.log(type)
      return `${ -type*18}px 0px`;
    }
  }
}

</script>


<style lang='scss' scoped>

.pokemon {
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    .title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

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

      .type {
        display: flex;
        align-self: center;
        background-image: url("../assets/types.png");
        flex: 0 0 auto;
        height: 20px;
        width: 20px;
        background-size: 128px 36px;
        font-weight: bold;
      }
    }

    .img-container {
      display: flex;
      flex-flow: column wrap;
      border: 3px solid rgb(233, 233, 233);
      border-radius: 5px;
      margin: 0px 5px 5px 5px;

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

</style>