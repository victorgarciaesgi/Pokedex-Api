let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    shortid = require('shortid'),
    config = require('../config.js');

/** list users **/
exports.list_all_users = function(req, res) {
    jwt.verify(req.token, config.secret, (err, users) => {
        User.find({}, function (err, users) {
            if (err) return res.status(500).send("Erreur lors de l'affichage des utilisateurs");
            res.status(200).send(users);
        });
   });
};

/** create user **/
exports.create_user = function(req, res){
    if(!!req.body.name && !!req.body.email && !!req.body.password){
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            function (err, user) {
                if (err) return res.status(500).send("Erreur lors de la création de l'utilisateur");
                res.status(200).send(user);
            }
        );
    }else{
        return res.status(500).send("Veuillez renseigner tous les champs (email, name, password)");
    }
};

/** display user **/
exports.read_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (!user) return res.status(404).send("Cet utilisateur n'existe pas ! Impossible de l'afficher...");
            if (err) return res.status(500).send("Erreur lors de l'affichage de l'utilisateur");
            res.status(200).send(user);
        });
    });
};

/** delete user **/
exports.delete_user = function(req, res) {
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOneAndRemove({name: req.params.name}, function (err, user) {
            if(!user) return res.status(404).send("Cet utilisateur n'existe pas ! Impossible de le supprimer...");
            if (err) return res.status(500).send("Erreur lors de la suppression de l'utilisateur"+ user.name);
            res.status(200).send("L'utilisateur " + user.name + " a été supprimé");
        });
    });
};

/** list pokemons user **/
exports.list_pokemons_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (!user) return res.status(404).send("L'utilisateur "+user.name+" n'existe pas !");
            if (err) return res.status(500).send("Erreur lors de l'affichages des pokemons de l'utilisateur "+user.name);
            res.status(200).send(user.pokemonsCatched);
        });
    });
};

/** create pokemons user **/
exports.create_pokemon_user = function(req, res){
    if(!!req.body.Name && !!req.body.Number) {
        jwt.verify(req.token, config.secret, (err, user) => {
            User.findOne({name: req.params.name}, function (err, user) {
                if (!user) return res.status(404).send("L'utilisateur " + user.name + " n'existe pas !");
                if (err) return res.status(500).send("Erreur lors de la capture du pokemon !");
                user.pokemonsCatched.push({
                    Id: shortid.generate(),
                    Name: req.body.Name,
                    Number: req.body.Number,
                    Level: 1
                });
                user.save();
                res.status(200).send(user.pokemonsCatched);
            });
        });
    }else{
        return res.status(500).send("Veuillez renseigner: Number (pokemon existant), Name (surnom)");
    }
};

/** display pokemon user **/
exports.read_pokemon_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (!user) return res.status(404).send("L'utilisateur "+user.name+" n'existe pas !");
            if (err) return res.status(500).send("Erreur lors de l'affichage du pokemon");
            let pokemonUser = user.pokemonsCatched.find(el => el.Id == req.params.Id);
            res.status(200).send(pokemonUser);
        });
    });
};

exports.update_pokemon_user = function (req, res) {
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (!user) return res.status(404).send("L'utilisateur "+user.name+" n'existe pas !");
            if (err) return res.status(500).send("Erreur lors de la modification du pokemon de l'utilisateur");
            user.pokemonsCatched.map(elem => {
                if (elem.Id == req.params.Id) {
                    elem.Name = req.body.Name;
                    elem.Level = req.body.Level;

                    return elem
                }
                return elem
            });
            user.save();
            res.status(200).send(user.pokemonsCatched);
        });
    });
};

/** delete pokemon user **/
exports.delete_pokemon_user = function(req, res){
    jwt.verify(req.token, config.secret, (err, user) => {
        User.findOne({name: req.params.name}, function (err, user) {
            if (!user) return res.status(404).send("L'utilisateur "+user.name+" n'existe pas !");
            if (err) return res.status(500).send("Erreur : method read_user");
            user.pokemonsCatched = user.pokemonsCatched.filter(el => el.Id != req.params.Id);
            user.save();
            res.status(200).send("Le pokemon "+user.pokemonsCatched+" a été supprimé");
        });
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


