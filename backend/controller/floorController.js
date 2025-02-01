const Floor = require('../models/Floor');
const Map = require('../models/Map');
const Building = require('../models/Building'); // Ensure Building model is imported

// Create a floor without a map
exports.createFloorWithNoMap = async (req, res) => {
  const { buildingId, floorNumber } = req.body;

  try {
    // Ensure buildingId is valid
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ success: false, message: 'Building not found' });
    }

    // Create the floor without a map initially
    const floor = new Floor({
      floorNumber,
      building: buildingId,  // Reference to the building
      map: null,              // No map at the time of creation
    });

    await floor.save();

    // Optionally update building's floors array (if needed)
    building.floors.push(floor._id);
    await building.save();

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
