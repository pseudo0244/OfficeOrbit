const mongoose = require("mongoose");
const FloorSchema = new mongoose.Schema({
    floorNumber: { type: Number, required: true }, // Floor number (e.g., 1, 2, 3)
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    }, // Reference to the building it belongs to
    map: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Map",
      required: true,
    }, // Reference to the floor's map
    points: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Point",
      },
    ], // References to all points on the floor
  });
  
  module.exports = mongoose.model("Floor", FloorSchema);
  