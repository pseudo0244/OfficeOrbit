const MeetingRoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true }, // Room number
    capacity: { type: Number, required: true }, // Room capacity
    isAvailable: { type: Boolean, default: true }, // Availability status
    amenities: { type: [String] }, // Amenities (e.g., "Projector", "Whiteboard")
  });
  
  module.exports = mongoose.model("MeetingRoom", MeetingRoomSchema);
  