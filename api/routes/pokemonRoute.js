module.exports = function(app) {
    let pokemon = require('../controllers/pokemonController');

    app.route('/pokemons')
        .get(pokemon.list_all_pokemons)
        .post(pokemon.create_pokemon);


    app.route('/pokemon/:Number')
        .get(pokemon.read_pokemon)
        .put(pokemon.update_pokemon)
        .delete(pokemon.delete_pokemon);
};