const Floor = require('../models/Floor');

// Create a new floor
exports.createFloor = async (req, res) => {
  const { name, buildingId } = req.body;
  try {
    const floor = new Floor({ name, building: buildingId });
    await floor.save();
    res.status(201).json({ success: true, data: floor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all floors for a building
exports.getFloorsByBuilding = async (req, res) => {
  const { buildingId } = req.params;
  try {
    const floors = await Floor.find({ building: buildingId });
    res.status(200).json({ success: true, data: floors });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
