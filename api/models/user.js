let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    pokemonsCaptures: {
        type: Array
    }
});


module.exports = mongoose.model('User', userSchema);