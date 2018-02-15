module.exports = function(app) {
    let user = require('../controllers/userController');

    app.route('/users')
        .get(user.verifyToken, user.list_all_users)
        .post(user.create_user);

    app.route('/users/:name')
        .put(user.verifyToken, user.update_user)
        .get(user.verifyToken, user.read_user)
        .delete(user.verifyToken, user.delete_user);

    app.route('/users/:name/pokemons')
        .get(user.verifyToken, user.list_pokemons_user)
        .post(user.verifyToken, user.create_pokemon_user);

    app.route('/users/:name/pokemons/:Id')
        .get(user.verifyToken, user.read_pokemon_user)
        .delete(user.verifyToken, user.delete_pokemon_user);
};