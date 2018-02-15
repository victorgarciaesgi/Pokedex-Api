let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    shortid = require('shortid'),
    config = require('../config.js');

/** list users **/
exports.list_all_users = function(req, res) {
    jwt.verify(req.token, config.secret, (err, users) => {
        User.find({}, function (err, users) {
            if (err) return res.status(500).send("Erreur : method list_all_users");
            res.status(200).send(users);
        });
   });
};

/** create user **/
exports.create_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            function (err, user) {
                if (err) return res.status(500).send("Erreur : method create_user");
                res.status(200).send(user);
            });
    });
};

/** display user **/
exports.read_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (err) return res.status(500).send("Erreur : method read_user");
            if (!user) return res.status(404).send("User non trouvé - method read_user");
            res.status(200).send(user);
        });
    });
};

/** edit user **/
exports.update_user = function (req, res) {
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOneAndUpdate({name: req.params.name}, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("Erreur : method update_user");
            res.status(200).send(user);
        });
    });
};

/** delete user **/
exports.delete_user = function(req, res) {
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOneAndRemove({name: req.params.name}, function (err, user) {
            if (err) return res.status(500).send("Erreur : method delete_user");
            res.status(200).send("User : " + user.name + " supprimé.");
        });
    });
};

/** list pokemons user **/
exports.list_pokemons_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (err) return res.status(500).send("Erreur : method list_pokemons_user");
            if (!user) return res.status(404).send("User non trouvé - method list_pokemons_user");
            res.status(200).send(user.pokemonsCatched);
        });
    });
};

/** create pokemons user **/
exports.create_pokemon_user = function(req, res){
    User.findOne({name: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("Erreur : method read_user");
        if (!user) return res.status(404).send("User non trouvé - method read_user");
        user.pokemonsCatched.push({
            Id: shortid.generate(),
            Number: req.body.Number,
            Level: 1
        });
        user.save();
        res.status(200).send(user);
    });
};

/** display pokemon user **/
exports.read_pokemon_user = function(req, res){
    User.findOne({name: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("Erreur : method read_user");
        if (!user) return res.status(404).send("User non trouvé - method read_user");
        let pokemonUser = user.pokemonsCatched.find(el => el.Id == req.params.Id);
        res.status(200).send(pokemonUser);
    });
};

/** delete pokemon user **/
exports.delete_pokemon_user = function(req, res){
    User.findOne({name: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("Erreur : method read_user");
        if (!user) return res.status(404).send("User non trouvé - method read_user");
        user.pokemonsCatched = user.pokemonsCatched.filter(el => el.Id != req.params.Id);
        user.save();
        res.status(200).send("Pokemon supprimé");
    });
};

exports.verifyToken = function(req, res, next) {
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
        res.status(403).send("Accès refusé. Vous devez vous logguer afin d'obtenir un JWT.");
    }
}


