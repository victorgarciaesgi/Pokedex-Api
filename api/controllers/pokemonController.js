let mongoose = require('mongoose'),
    Pokemon = mongoose.model('Pokemon'),
    jwt = require('jsonwebtoken'),
    config = require('../config.js');

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    jwt.verify(req.token, config.secret, (err, pokemons) => {
        let query = Pokemon.find({}).select('Number Name Types Resistant Weaknesses FastAttack SpecialAttack');
        query.exec(function (err, pokemons) {
            if (err)
                res.send(err)
            res.json(pokemons)
        })
    });
};

/** create pokemon **/
exports.create_pokemon = function(req, res) {
    let new_pokemon = new Pokemon(req.body);
    new_pokemon.save(function (err, pokemon) {
        if (err)
            res.send(err);
        res.json({message:'list pokemon...', pokemon});
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

/** verify token **/
exports.verifyToken = function (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
