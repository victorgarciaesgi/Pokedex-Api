let mongoose = require('mongoose');

let typeSchema = new mongoose.Schema({
    name: String,
    color: {
      type: String,
      default: 'red'
    }
});

// champs virtuel non stocke dans la base (firstname / lastname - virtuel fullname)
// déini des relations entre les différents type
// relation many to many entre type et pokemon
typeSchema.virtual('pokemon', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});