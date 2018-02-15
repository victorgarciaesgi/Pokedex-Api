// AuthController.js
let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require('../config.js'),
    jwt = require('jsonwebtoken');



/** Welcome **/
exports.index = function(req, res) {
    res.json({
        message: 'Welcome to the API'
    });
};

/** login **/
exports.login = function(req, res){

    let user = req.body;

    console.log(user);

    User.findOne({name: user.name}, function (err, user) {
        if (err) return res.status(500).send("Erreur : method login");
        if (!user) {
            return res.status(404).send("User non trouvé !")
        }else{
            jwt.sign({user}, config.secret, { expiresIn: '30s' }, (err, token) => {
                res.send(
                    token
                );
            });
        }
    });
};

/** TOKEN FORMAT
 - Authorization: Bearer <access_token> **/

/** Verif token **/

