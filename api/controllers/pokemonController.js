let mongoose = require('mongoose'),
    Pokemon = mongoose.model('Pokemon'),
    attributesSelect = 'Number Name Types Resistant Weaknesses FastAttack SpecialAttack MaxHP NextEvolution PreviousEvolution Level';

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    let query = Pokemon.find({}).select(attributesSelect).sort([['Number', 'ascending']]);
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
    let query = Pokemon.find({Number: req.params.Number}).select(attributesSelect);
    query.exec(function (err, pokemons) {
        if (err)
            res.send(err)
        res.json(pokemons)
    })
};

/** update pokemon **/
exports.update_pokemon = function(req, res) {
    Pokemon.findOneAndUpdate({Number: req.params.Number}, req.body, {new: true}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** delete pokemon **/
exports.delete_pokemon = function(req, res) {
    Pokemon.remove({
        Number: req.params.Number
    }, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json({ message: 'Pokemon successfully deleted' });
    });
};
