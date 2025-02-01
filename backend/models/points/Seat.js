const SeatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true }, // Seat number
    isOccupied: { type: Boolean, default: false }, // Occupancy status
    occupant: { type: String }, // Occupant's name or ID
    deskAvailable: { type: Boolean, default: true }, // Desk availability
  });
  
  module.exports = mongoose.model("Seat", SeatSchema);
  