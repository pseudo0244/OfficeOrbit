const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor', // Reference to the Floor model
    required: true, // Ensure this is required when creating a map
  },
  points: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Point',  // Reference to Point model
    },
  ],
  mapImagePath: {
    type: String,  // Store the path or URL of the uploaded map image
    required: true,
  },
});

module.exports = mongoose.model('Map', mapSchema);
