let mongoose = require('mongoose'),
    Pokemon = mongoose.model('Pokemon');

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    Pokemon.find({}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** create pokemon **/
exports.create_pokemon = function(req, res) {
    let new_pokemon = new Pokemon(req.body);
    new_pokemon.save(function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** display pokemon **/
exports.read_pokemon = function(req, res) {
    Pokemon.findById(req.params.pokemonId, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** update pokemon **/
exports.update_pokemon = function(req, res) {
    Pokemon.findOneAndUpdate({_id: req.params.pokemonId}, req.body, {new: true}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** delete pokemon **/
exports.delete_pokemon = function(req, res) {
    Pokemon.remove({
        _id: req.params.pokemonId
    }, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json({ message: 'Pokemon successfully deleted' });
    });
};
