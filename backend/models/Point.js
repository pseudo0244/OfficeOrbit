const mongoose = require("mongoose");
const PointsSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the point (e.g., "Seat 1")
    type: { type: String, required: true }, // Type of point (e.g., "Seat", "Meeting Room")
    coordinates: {
      type: [Number], // Coordinates on the map (e.g., [x, y])
      required: true,
    },
    description: { type: String }, // Description of the point
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    }, // Reference to the floor it belongs to
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Sub-schema for type-specific data
    },
  });
  
  module.exports = mongoose.model("Point", PointsSchema);
  