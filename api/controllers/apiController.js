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
    // Mock user
    // const user = {
    //     id: 1,
    //     username: 'joe',
    //     email: 'joe@gmail.com',
    //     password: 'mdpJoe'
    // };
    let user = req.body;

    jwt.sign({user}, config.secret, { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
};

/** TOKEN FORMAT
 - Authorization: Bearer <access_token> **/

/** Verif token **/

