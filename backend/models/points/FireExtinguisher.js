const FireExtinguisherSchema = new mongoose.Schema({
    extinguisherID: { type: String, required: true }, // Unique ID
    lastInspectionDate: { type: Date, required: true }, // Last inspection date
    status: { type: String, default: "Operational" }, // Status (e.g., "Operational", "Needs Maintenance")
  });
  
  module.exports = mongoose.model("FireExtinguisher", FireExtinguisherSchema);
  