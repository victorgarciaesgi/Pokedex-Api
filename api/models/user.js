let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
//    pokemonsCaptures: []
});


module.exports = mongoose.model('User', userSchema);