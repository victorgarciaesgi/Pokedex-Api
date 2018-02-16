# Pokedex API
An API to get info on the Pokemons written in NodeJs/Express and Vue.js with Vue-Router and Vuex

## Screnshots

[accueil](https://github.com/victorgarciaesgi/Pokedex-Api/blob/master/captures/acceuil.png?raw=true)
[mypokemons](https://github.com/victorgarciaesgi/Pokedex-Api/blob/master/captures/mypokemons.png?raw=true)
[pokemon](https://github.com/victorgarciaesgi/Pokedex-Api/blob/master/captures/pokemon.png?raw=true)


## Install MongoDB and launch it

```bash
mongod
```

## Import pokemon data

```bash
mongoimport --db Pokemondb --collection pokemons --file pokemon-data.json --jsonArray
```

## Install and start Node Server

```bash
yarn 
```
or
```bash
npm install
```


```bash
npm start
```

The api start on port http://localhost:3000

## Install and start Vue.js web pack server

```bash
cd ./Front
```

```bash
yarn 
```
or
```bash
npm install
```


```bash
npm run dev
```

The api start on port http://localhost:8080
