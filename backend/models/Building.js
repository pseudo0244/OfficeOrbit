const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  floors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
  }],
});

module.exports = mongoose.model('Building', buildingSchema);
