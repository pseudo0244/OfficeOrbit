const Map = require('../models/Map');
const Point = require('../models/Point');
const Floor = require('../models/Floor');

// Create a new map with uploaded image
exports.createMap = async (req, res) => {
  const { floorId, mapImagePath } = req.body;

  try {
    // Check if mapImagePath is provided
    if (!mapImagePath) {
      return res.status(400).json({ success: false, message: 'Map image URL is required' });
    }

    // Validate the floorId
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ success: false, message: 'Floor not found' });
    }

    // Create a new map
    const newMap = new Map({
      floor: floorId,       // Reference to the floor
      mapImagePath,         // Use the URL provided in the request
      points: [],           // Initialize with an empty array of points
    });

    await newMap.save();
    res.status(201).json({ success: true, data: newMap });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add points to the map
exports.addPointsToMap = async (req, res) => {
  const { mapId, points } = req.body;  // points is an array of Point IDs

  try {
    const map = await Map.findById(mapId);
    if (!map) {
      return res.status(404).json({ success: false, message: 'Map not found' });
    }

    // Add the points to the map
    map.points.push(...points);  // Push the point references to the map
    await map.save();

    res.status(200).json({ success: true, data: map });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get maps by floorId
exports.getMapsByFloor = async (req, res) => {
  const { floorId } = req.params;

  try {
    const maps = await Map.find({ floor: floorId }); // Find maps where the floorId matches
    if (maps.length === 0) {
      return res.status(404).json({ success: false, message: 'No maps found for this floor' });
    }
    res.status(200).json({ success: true, data: maps });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
