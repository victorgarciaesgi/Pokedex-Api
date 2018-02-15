let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
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
    User.create({
        Name : req.body.name,
        Email : req.body.email,
        Password : req.body.password,
        PokemonsCaptures: []
    },
    function (err, user) {
        if (err) return res.status(500).send("Erreur : method create_user");
        res.status(200).send(user);
    });
};

/** display user **/
exports.read_user = function(req, res){
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Erreur : method read_user");
        if (!user) return res.status(404).send("User non trouvé - method read_user");
        res.status(200).send(user);
    });
};

/** edit user **/
exports.update_user = function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Erreur : method update_user");
        res.status(200).send(user);
    });
};

/** delete user **/
exports.delete_user = function(req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Erreur : method delete_user");
        res.status(200).send("User : "+ user.name +" supprimé.");
    });
};

/** list pokemons user **/
exports.list_pokemons_user = function(req, res){

};

/** create pokemons user **/
exports.create_pokemon_user = function(req, res){

};

/** display pokemon user **/
exports.read_pokemon_user = function(req, res){


};

/** delete pokemon user **/
exports.delete_pokemon_user = function(req, res){

};
