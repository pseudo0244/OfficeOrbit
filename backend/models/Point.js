const mongoose = require("mongoose");

const PointsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true, // Trims whitespace from the name
  }, // Name of the point (e.g., "Seat 1")
  type: { 
    type: String, 
    required: true, 
    enum: ["Seat", "Meeting Room", "Desk", "Common Area", "Restroom"], // Predefined types
  }, // Type of point (e.g., "Seat", "Meeting Room")
  coordinates: {
    type: [Number], // Coordinates on the map (e.g., [x, y])
    required: true,
    validate: {
      validator: function (coords) {
        return coords.length === 2 && coords.every(Number.isFinite); // Ensures exactly 2 valid numbers
      },
      message: "Coordinates must be an array of two numbers [x, y].",
    },
  },
  description: { 
    type: String, 
    maxlength: 200, // Limits description to 200 characters
  }, // Description of the point
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  }, // Reference to the floor it belongs to
  metadata: {
    type: mongoose.Schema.Types.Mixed, // Flexible field for type-specific data
  },
  isReserved: { 
    type: Boolean, 
    default: false, // Defaults to false
  }, // Indicates if the point is reserved
  reservedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who reserved the point
  }, // User who reserved the point (if applicable)
  createdAt: { 
    type: Date, 
    default: Date.now, // Automatically sets the creation date
  }, // Timestamp when the point was created
  updatedAt: { 
    type: Date, 
    default: Date.now, // Automatically sets the update date
  }, // Timestamp when the point was last updated
});

// Middleware to update the `updatedAt` field before saving
PointsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Point", PointsSchema);