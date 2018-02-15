module.exports = function(app) {
    let user = require('../controllers/userController');

    app.route('/users')
        .get(user.list_all_users)
        .post(user.create_user);

    app.route('/users/:name')
        .put(user.update_user)
        .get(user.read_user)
        .delete(user.delete_user);

    app.route('/users/:name/pokemons')
        .get(user.list_pokemons_user)
        .post(user.create_pokemon_user);

    app.route('/users/:name/pokemons/:Id')
        .get(user.read_pokemon_user)
        .delete(user.delete_pokemon_user);
};