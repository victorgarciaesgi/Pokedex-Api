<template>

  <header>
    <ul class='routes left'>
      <router-link to='/'>
        <li>Accueil</li>
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
  </header>

</template>



<script>

export default {
  name: 'HeaderComponent'
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
  background-color: #e04b4b;
  color: white;

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
      transition: background-color 0.3s;

      &:hover {
        background-color: #b92d2d;
      }
    }
  }
}

.input-form {
  position: relative;
  background-color: rgb(220,220,220);
  color: rgb(70,70,70);
  height: 35px;
  padding: 5px 30px 5px 9px;
  margin: 5px 0 5px 0;
  width: 100%;
  line-height: 35px;
  font-size: 13px;
  border-radius: 3px;

  &:focus{
    background-color: rgb(225,225,225);
    &~ .input-icon-contain .input-icon /deep/ svg {
      fill: rgb(60,60,60);
    }
  }
}

</style>