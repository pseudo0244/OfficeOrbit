const express = require('express');
const { createMap, addPointsToMap, getMapsByFloor } = require('../controller/mapController');
const upload = require('../middleware/fileUploadMiddleware');
const router = express.Router();

// Route for uploading and creating a map
router.post('/upload', createMap);

// Route for adding points to a map
router.post('/addPoints', addPointsToMap);

// Route to get maps by floorId
router.get('/floor/:floorId', getMapsByFloor);

module.exports = router;
