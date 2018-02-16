// AuthController.js
let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('../config.js'),
    jwt = require('jsonwebtoken');



/** Welcome **/
exports.index = function(req, res) {
    res.json({
        message: 'Welcome to the API (y)'
    });
};

/** login **/
exports.login = function(req, res){
    let user = req.body;

    console.log(user);

    User.findOne({name: user.name, password: user.password}, function (err, user) {
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé !")
        }else{
            jwt.sign({user}, config.secret, { expiresIn: '3600s' }, (err, token) => {
                res.send(
                    token
                );
            });
        }
        if (err) return res.status(500).send("Erreur lors de la connexion au pokedex !");
    });
};

