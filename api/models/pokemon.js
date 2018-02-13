let mongoose = require('mongoose');

// let pokemonSchema = new Schema({
//    _id: Number,
//    name: String,
//    type: String,
//    level: Number,
//    img: String,
//    evolution: [{levelEvolution: String, nameEvolution: String}]
// });



let pokemonSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    level: {
        type: Number
    },
    img: {
        type: String
    }
});


module.exports = mongoose.model('Pokemon', pokemonSchema);