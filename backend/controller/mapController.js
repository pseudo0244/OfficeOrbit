const Map = require('../models/Map');
const upload = require('../middleware/fileUploadMiddleware');

// Create a map for a floor
exports.createMap = async (req, res) => {
  const { floorId } = req.body;
  try {
    const map = new Map({ floor: floorId, url: req.file.path });
    await map.save();
    res.status(201).json({ success: true, data: map });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
