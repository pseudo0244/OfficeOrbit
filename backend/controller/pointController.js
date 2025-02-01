const Point = require('../models/Point');

// Add a new point to a map
exports.addPoint = async (req, res) => {
  const { mapId, type, coordinates, data } = req.body;
  try {
    const point = new Point({ map: mapId, type, coordinates, data });
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
    const points = await Point.find({ map: mapId });
    res.status(200).json({ success: true, data: points });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
