const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var TaskSchema = new Schema({
  type: {
    type: String,
    required: 'Indiquez un type'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  tier: {
    type: [{
      type: String,
      enum: ['common', 'rare', 'super rare', 'epic', 'mythic', 'legendary']
    }],
  },
  
});

module.exports = mongoose.model('Tasks', TaskSchema);