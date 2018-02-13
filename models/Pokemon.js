let mongoose = require('mongoose');
let Schema = mongoose.Schema();

let pokemonSchema = new Schema({
   name: String,
   number: Number,
   description: String,
   picture: String,
   types: {
       type: mongoose.Types.objectId,
       ref: 'Type'
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

let Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;