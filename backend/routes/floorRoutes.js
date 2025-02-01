const express = require('express');
const upload = require('../middleware/fileUploadMiddleware');
const { createFloorWithNoMap, getFloorsByBuilding } = require('../controller/floorController');
const Map = require('../models/Map');  // Assuming you have a Map model
const Floor = require('../models/Floor');  // Assuming you have a Floor model
const router = express.Router();

// Create a floor without a map
router.post('/create', createFloorWithNoMap);

// Get floors by building
router.get('/:buildingId', getFloorsByBuilding);

// Upload a map and link it to a floor
router.post('/upload/:floorId', upload.single('map'), async (req, res) => {
  const { floorId } = req.params;

  try {
    const map = new Map({
      name: req.file.filename,  // Map's name will be the file name or any other identifier
      filePath: req.file.path,  // Assuming the file upload middleware stores the file
    });

    await map.save();

    // Find the floor and update its map reference
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ success: false, message: 'Floor not found' });
    }
    
    floor.map = map._id;  // Link the uploaded map to the floor
    await floor.save();

    res.status(201).json({ success: true, data: map });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
