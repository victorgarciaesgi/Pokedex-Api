# Creer une api REST CRUD
l’application est un pokédex,
on doit pouvoir recupérer la liste des pokémons
recupere un pokemon en particulier
creer un nouveau pokemon dans le pokedex
pouvoir le modifier et le supprimer

toutes ces routes seront public
GET /pokemons liste tous les pokemons
GET /pokemons/:id récupéré un pokemon
POST /pokemons créer un pokemon
PUT /pokemons/:id modifie tous le user
PATCH /pokemons/:id modifie un champs du pokemons
DELETE /pokemons/:id supprime le pokemon
const pokemons = {
  _id,
  name,
  type,
  niveau,
  img,
  evolution: [{ niveauEvolution, evolutionName }]
};
en plus, il y aura un espace utilisateur.
Un utilisateur aura une liste de pokemeon qui lui est propre,
ces pokemons qu'il a capturé.
on pourra supprimer un pokemeon de sa liste,
modifier un pokemon (changement de niveau), en ajouter un.
ces routes seront privé, vous utiliserez jwt pour proteger vos routes.

les utilisateur seront creer staiquement grae à la route
pas de securité particuliere n'est démandées
POST users/ body { name, email, password } creer un utilisateur
GET users/ liste tous les utilisateurs
const user = {
  _id,
  name,
  email,
  password,
  pokemonsCaptures: [_idPokemeon]
};
toutes ces routes seront privé
GET users/:id/pokemons liste tous les pokemons
GET users/:id/pokemons/:id récupéré un pokemon
POST users/:id/pokemons créer un pokemon
PUT users/:id/pokemons/:id modifie tous le user
PATCH users/:id/pokemons/:id modifie un champs du pokemons
DELETE users/:id/pokemons/:id supprime le pokemon

## A rendre :

* une collection postman
* les sources du projets

soutenance le vendredi apres-midi où vous expliquerez ce que vous avez fait

### RESOURCES:

* http://expressjs.com/fr/4x/api.html
* http://mongoosejs.com/docs/guide.html
* https://github.com/bradtraversy/node_jwt_example/blob/master/app.js
* https://www.youtube.com/watch?v=7nafaH9SddU&index=7&list=PL1WGNfBWrhOAUlxTbAA2thzYy0hY3aO3l