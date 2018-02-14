<template>
  <router-link :to='`/pokemon/${pokemon.Number}`'>
    <div class='pokemon'>
      <div class='container' :style="{'background-image': `url(${getTexture})`}">
        <div class='title'>
          <span class='level'>
            <span>NIVEAU 1</span>
          </span>
          <span class='name'>{{pokemon.Name}}</span>
          <span class='pv'>{{getPV}}<span>pv</span></span>
          <span class='type' :style="{backgroundPosition: getIcon}"></span>
        </div>
        <div class='img-container'>
          <div class='img' :style="{'background-image': `url(${getImage})`}"></div>
          <div class='img-info'>n°378 Pokémon truc Taille: 2cm  Poids: 10kg</div>
        </div>
        <div class='infos'>
          <ul class='attacks'>
            <li class='first' v-if='pokemon.FastAttack.length > 0'>
              <span class='type' :style="{backgroundPosition: getType(pokemon.FastAttack[0].Type)}"></span>
              <span class='name'>{{pokemon.FastAttack[0].Name}}</span>
              <span class='dmg'>{{pokemon.FastAttack[0].Damage}}</span>
            </li>
            <li class='second' v-if='pokemon.SpecialAttack.length > 0'>
              <span class='type' :style="{backgroundPosition: getType(pokemon.SpecialAttack[0].Type)}"></span>
              <span class='name'>{{pokemon.SpecialAttack[0].Name}}</span>
              <span class='dmg'>{{pokemon.SpecialAttack[0].Damage}}</span>
            </li>
          </ul>
          <ul class='autre'>
            <li>
              <span class='title'>Faiblesse</span>
              <div class='list'>
                <span class='type' v-for='weak in pokemon.Weaknesses.slice(0,3)' 
                :key='weak'
                :style="{backgroundPosition: getType(weak)}"></span>
              </div>
            </li>
            <li>
              <span class='title'>Résistances</span>
              <div class='list'>
                <span class='type' v-for='resist in pokemon.Resistant.slice(0,3)' 
                :key='resist'
                :style="{backgroundPosition: getType(resist)}"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='edit'>
        <img src="~../assets/edit.svg" alt="">
      </div>
    </div>  
  </router-link>
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
        "Normal",
        "Grass",
        "Psychic",
        "Fire",
        "Ground",
        "Water",
        "Electric"
      ]
    }
  },
  computed: {
    getTexture() {
      return require(`../assets/PokemonTextures/${this.pokemon.Types[0]}.png`)
    },
    getIcon() {
      let type = this.types.indexOf(this.pokemon.Types[0]);
      return `${ -type*18}px 0px`;
    },
    getImage() {
      return `https://raw.githubusercontent.com/fanzeyi/Pokemon-DB/master/img/${this.pokemon.Number}${this.pokemon.Name}.png`
    },
    getPV() {
      return Math.round(Number(this.pokemon.MaxHP) / 200) * 10;
    }
  },
  methods: {
    getType(value) {
      let type = this.types.indexOf(value);
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
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);

    .edit {
      display: flex;
    }
  }

  .edit {
    display: none;
    justify-content: center;
    position: relative;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 15px;
    background-color: rgba(20,20,20, 0.7);
    border-radius: 100%;
    height: 40px;
    width: 40px;
  }

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
        font-size: 14px;
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
        height: 150px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        background-color: rgb(207, 207, 207);
        border-bottom: 3px solid rgb(233, 233, 233);
      }

      .img-info {
        background-color: rgb(233, 233, 233);
        box-shadow: inset 0 0 10px rgba(10,10,10,0.3);
        font-size: 7px;
      }
    }

    .infos {
      display: flex;
      flex-flow: column wrap;

      ul.attacks {
        display: flex;
        flex-flow: column wrap;
        padding: 0 10px 10px 5px;
        border-bottom: 1px solid black;

        li {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-top: 15px;

          .type {
            display: flex;
            background-image: url("../assets/types.png");
            flex: 0 0 auto;
            height: 20px;
            width: 20px;
            background-size: 128px 36px;
            font-weight: bold;
          }

          .name {
            font-weight: bold;
            flex: 1 1 auto;
            color: black;
          }

          .dmg {
            font-weight: bold;
            flex: 0 0 auto;
            font-size: 16px;
          }
        }
        
      }
      ul.autre {
        display: flex;
        flex-flow: row nowrap;

        li {
          display: flex;
          flex-flow: column wrap;
          justify-content: center;
          flex: 1 1 auto;

          .title {
              font-size: 10px; font-weight: bold;
            }

          .list {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            margin-top: 5px;

            .type {
              display: flex;
              background-image: url("../assets/types.png");
              flex: 0 0 auto;
              height: 20px;
              width: 20px;
              background-size: 128px 36px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

</style>