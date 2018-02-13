<template>

  <header>
    <ul class='routes left'>
      <router-link to='/'>
        <li>Accueil</li>
      </router-link>
      <router-link to='/mypokemons'>
        <li>Mes pokémons</li>
      </router-link>
    </ul>

    <ul class='routes right'>
      <router-link to='/connexion'>
        <li>Connexion</li>
      </router-link>
      <router-link to='/inscription'>
        <li>Inscription</li>
      </router-link>
    </ul>
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

  ul.routes{
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-flow: row wrap;
    font-weight: bold;
    padding: 0 20px 0 20px;

    &.left {
      justify-content: flex-start;
    }

    &.right {
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

</style>