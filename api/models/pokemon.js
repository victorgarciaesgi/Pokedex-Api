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
    Number: {
        type: String
    },
    Name: {
        type: String
    },
    Level: {
        type: Number,
        default: 1
    },
    Types: {
        type: Array
    },
    Resistant: {
        type: Array
    },
    Weaknesses: {
        type: Array
    },
    FastAttack: {
        type: Array
    },
    SpecialAttack: {
        type: Array
    },
    PreviousEvolution: {
        type: Array
    },
    NextEvolution: {
        type: Array
    },
    MaxHP: {
        type: Number
    }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);