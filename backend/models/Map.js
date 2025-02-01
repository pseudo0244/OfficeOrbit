const mongoose = require("mongoose");
const MapSchema = new mongoose.Schema({
    mapURL: { type: String, required: true }, // URL of the map image
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    }, // Reference to the floor it belongs to
    uploadedBy: { type: String }, // Name or ID of the admin who uploaded it
  });
  
  module.exports = mongoose.model("Map", MapSchema);
  