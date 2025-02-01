const Building = require('../models/Building');

// Create a new building
exports.createBuilding = async (req, res) => {
  const { name, floors } = req.body;
  try {
    const building = new Building({ name, floors });
    await building.save();
    res.status(201).json({ success: true, data: building });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().populate('floors');
    res.status(200).json({ success: true, data: buildings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
