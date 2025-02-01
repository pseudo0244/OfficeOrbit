const mongoose = require("mongoose");

const FloorSchema = new mongoose.Schema({
  floorNumber: { 
    type: Number, 
    required: true 
  }, // Floor number (e.g., 1, 2, 3)
  
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
    required: true,
  }, // Reference to the building it belongs to
  
  map: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Map", // Reference to the floor's map (which will be uploaded later)
    required: false, // Not required initially
  }, 
});

module.exports = mongoose.model("Floor", FloorSchema);
