module.exports = function(app) {
    let pokemon = require('../controllers/pokemonsControllers');

    app.route('/pokemons')
        .get(pokemon.list_all_pokemons)
        .post(pokemon.create_a_pokemon());


    app.route('/pokemon/:pokemonId')
        .get(pokemon.read_a_pokemon())
        .put(pokemon.update_a_pokemon())
        .delete(pokemon.delete_a_pokemon());
};