let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String
    },
    PokemonsCaptures: {
        type: Array
    }
});


module.exports = mongoose.model('User', userSchema);