const CoffeeMachineSchema = new mongoose.Schema({
    machineID: { type: String, required: true }, // Machine ID
    status: { type: String, default: "Operational" }, // Status of the machine
    coffeeTypes: { type: [String] }, // Coffee types (e.g., "Espresso", "Latte")
  });
  
  module.exports = mongoose.model("CoffeeMachine", CoffeeMachineSchema);
  