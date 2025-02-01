const Point = require('../models/Point');


// Add a new point to a map
exports.addPoint = async (req, res) => {
  const { mapId, name, type, coordinates, description, floor, metadata, isReserved, reservedBy } = req.body;

  try {
    // Ensure that all required fields are provided
    if (!mapId || !name || !type || !coordinates || !floor) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create a new point object
    const point = new Point({
      map: mapId,
      name,
      type,
      coordinates,
      description,
      floor,
      metadata,
      isReserved: isReserved || false, // Default to false if not provided
      reservedBy,
    });

    await point.save();
    res.status(201).json({ success: true, data: point });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all points for a map
exports.getPointsByMap = async (req, res) => {
  const { mapId } = req.params;

  try {
    // Ensure the map exists
    const points = await Point.find({ map: mapId });
    if (points.length === 0) {
      return res.status(404).json({ success: false, message: 'No points found for this map' });
    }

    res.status(200).json({ success: true, data: points });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get all points for a map
exports.getPointsByMap = async (req, res) => {
  const { mapId } = req.params;
  try {
    const points = await Point.find({ map: mapId });
    res.status(200).json({ success: true, data: points });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
