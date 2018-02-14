let mongoose = require('mongoose'),
    Pokemon = mongoose.model('Pokemon');

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    let query = Pokemon.find({}).select('Number Name Types Resistant Weaknesses FastAttack SpecialAttack');
    query.exec(function (err, pokemons) {
        if (err)
            res.send(err)
        res.json(pokemons)
    })
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
    Pokemon.findById(req.params.Number, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** update pokemon **/
exports.update_pokemon = function(req, res) {
    Pokemon.findOneAndUpdate({_id: req.params.Number}, req.body, {new: true}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** delete pokemon **/
exports.delete_pokemon = function(req, res) {
    Pokemon.remove({
        _id: req.params.Number
    }, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json({ message: 'Pokemon successfully deleted' });
    });
};
