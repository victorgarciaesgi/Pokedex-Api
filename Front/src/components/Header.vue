<template>

  <header>
    <ul class='routes left'>
      <router-link to='/'>
        <li>
          <img class='logo' :class='{animate: $store.state.fetching}' src="~../assets/pokeball.png" alt="">
        </li>
      </router-link>
      <router-link to='/mypokemons' v-if='$store.state.userConnected'>
        <li>Mes pokémons</li>
      </router-link>
    </ul>

    <div class='search'>
      <input class='input-form' type="text" v-model='$store.state.search'
      placeholder='Rechercher un pokemon'>
    </div>

    <template v-if='!$store.state.userConnected'>
      <ul class='routes right'>
        <router-link to='/connexion'>
          <li>Connexion</li>
        </router-link>
        <router-link to='/inscription'>
          <li>Inscription</li>
        </router-link>
      </ul>
    </template>
    <template v-else>
      <ul class='routes right'>
        <li>{{$store.state.userInfos.name}}</li>
        <li @click='disconnect()'>Deconnexion</li>

      </ul>
    </template>
  </header>

</template>



<script>

export default {
  name: 'HeaderComponent',
  methods: {
    disconnect() {
      this.$store.dispatch('disconnectRequest');
    }
  }
}

</script>


<style lang='scss' scoped>

header {
  position: fixed;
  display: flex;
  height: 50px;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: rgb(39, 39, 39);
  box-shadow: 0 0 5px rgb(0,0,0);
  color: white;
  z-index: 10000;

  .search {
    display: flex;
    align-items: center;
  }

  ul.routes{
    position: relative;
    display: flex;
    flex: 0 0 auto;
    flex-flow: row wrap;
    font-weight: bold;
    padding: 0 20px 0 20px;

    &.right {
      flex: 1 1 auto;
      justify-content: flex-end;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px 0 10px;
      transition: color 0.3s;

      .logo{
        transition: transform 0.3s;

        &.animate {
          animation: rotation 0.5s infinite linear;
        }

        &:hover {
          transform: scale(1.1);
        }
      }

      img {
        height: 35px;
        width: 35px;
      }

      &:hover {
        color: #b92d2d;
      }
    }
  }
}



.input-form {
  position: relative;
  background-color: rgb(240, 240, 240);
  color: rgb(70,70,70);
  height: 35px;
  padding: 5px 30px 5px 9px;
  margin: 5px 0 5px 0;
  width: 100%;
  line-height: 35px;
  font-size: 13px;
  border-radius: 5px;

  &:focus{
    background-color: rgb(225,225,225);
    &~ .input-icon-contain .input-icon /deep/ svg {
      fill: rgb(60,60,60);
    }
  }
}

</style>