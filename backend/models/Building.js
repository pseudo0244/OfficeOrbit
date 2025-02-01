const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Building name (e.g., "Building A")
  address: { type: String }, // Address of the building
  floors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
    },
  ], // References to all the floors in this building
});

module.exports = mongoose.model("Building", BuildingSchema);
