<template>
  <router-link :to='getRoute' class='wrapper'>
    <div class='pokemon' :class='[modify]'>
      <div class='container' :style="{'background-image': `url(${getTexture})`}">
        <div class='title'>
          <span class='level'>
            <span>NIVEAU {{pokemon.Level}}</span>
          </span>
          <span class='name'>{{pokemon.Name2 || pokemon.Name}}</span>
          <span class='pv'>{{getPV}}<span>pv</span></span>
          <span class='type' :style="{backgroundPosition: getIcon}"></span>
        </div>
        <div class='img-container'>
          <div class='img' :style="{'background-image': `url(${getImage})`}"></div>
          <div class='img-info'>n°378 Pokémon truc Taille: 2cm  Poids: 10kg</div>
          <div class='evolution' v-if='pokemon.NextEvolution.length'
            :style="{'background-image': `url(${Image(Pokemon(pokemon.NextEvolution[0].Number))})`}">
            </div>
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
              <span class='title'>Faiblesses</span>
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

      <div class='editPopup' v-show='editMode' @click.prevent>
        <form >
          <label for="">Nom</label>
          <input required type="text" class='input-form' v-model='editData.Name'>
          <label for="">Level</label>
          <input required type="text" class='input-form' v-model='editData.Level'>

          <div class='footer'>
            <button @click.prevent='closeEdit()'>
              <span>Annuler</span>
            </button>
            <button @click.prevent='editPokemon' type='submit' class='blue'>
              <span>Editer</span>
            </button>
          </div>
        </form>
      </div>

      <div class='edit' @click.stop.prevent='handleClick()'>
        <img v-if='modify' src="~../assets/edit.svg" alt="">
        <img v-else src="~../assets/add.svg" alt="">
      </div>

      <div class='delete' v-if='modify' @click.stop.prevent='handleDelete()'>
        <img  src="~../assets/quit_white.svg" alt="">
      </div>
    </div>  
  </router-link>
</template>



<script>

import axios from 'axios';

export default {
  name: 'PokemonCard',
  props: [
    'pokemon', 'modify'
  ],
  data() {
    return {
      types: ["Normal","Grass","Psychic","Fire","Ground","Water","Electric"],
      editMode: false,
      editData: {
        Name: this.pokemon.Name2 || this.pokemon.Name,
        Level: this.pokemon.Level
      }
    }
  },
  computed: {
    getRoute() {
      if (this.modify) {
        return `/myPokemons/${this.pokemon.Id}`
      }
      return `/pokemon/${this.pokemon.Number}`;
    },
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
    },
    logPoke() {
      console.log(this.pokemon)
    }
  },
  methods: {
    handleClick() {
      if (this.modify) {
        this.editMode = true;
      } else {
        this.$store.dispatch('addPokemon', this.pokemon);
      }
    },
    editPokemon() {
      console.log('lol');
      this.$store.dispatch('editPokemon', {form: this.editData, pokemon: this.pokemon.Id});
      this.closeEdit();
    },
    closeEdit() {
      this.editMode = false,
      this.editData = {
        Name: this.pokemon.Name,
        Level: this.pokemon.Level
      }
    },
    handleDelete() {
      this.$store.dispatch('deletePokemon', this.pokemon.Id);
    },
    getType(value) {
      let type = this.types.indexOf(value);
      return `${ -type*18}px 0px`;
    },
    Pokemon(id) {
      let pokemon = this.$store.getters.getPokemon(id);
      if (pokemon) {
        return pokemon;
      } 
      return false;
    },
    Image(pokemon) {
      return `https://raw.githubusercontent.com/fanzeyi/Pokemon-DB/master/img/${pokemon.Number}${pokemon.Name}.png`
    },
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

  .delete {
    @extend .edit;
    left: 15px;
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
      position: relative;
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

      .evolution {
        position: absolute;
        padding: 5px;
        left: -10px;
        top: -5px;
        height: 35px;
        width: 35px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        background-color: rgb(48, 48, 48);
        border: 2px solid rgb(233, 140, 33);
        box-shadow: 0 0 10px rgba(10,10,10, 0.3);
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

.editPopup {
  position: absolute;
  background-color: white;
  z-index: 10;
  left: 0;
  top: 0;
  padding: 10px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(10,10,10,0.2);
  
  form {
    display: flex;
    flex-flow: column wrap;

    .footer {
      display: flex;
      flex-flow: row nowrap;
    }
  }

  label {
    text-align: left;
  }
}


button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 33px;
  border-radius: 4px;
  margin: 0 5px 0 5px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  padding: 0px 13px 0px 13px;
  user-select: none;

  span{
    font-size: 15px;
    color: rgb(53, 53, 53);
    font-weight: bold;
    text-transform: uppercase;
  }

  .loading{
    display: none;
    margin-left: 6px;
    height: 24px;
    width: 24px;
  }

  &.submitting {
    cursor: wait;
    .loading{
      display: block;
    }
  }

  &:hover{
    background-color: rgb(230,230,230);
  }

  &:active{
    background-color: rgb(220,220,220);
  }

  &.blue span{
    color: #4b87e0;
  }

}

</style>