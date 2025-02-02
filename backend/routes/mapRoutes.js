const express = require('express');
const { createMap, addPointsToMap, getMapsByFloor } = require('../controller/mapController');
const upload = require('../middleware/fileUploadMiddleware'); // Import the file upload middleware
const router = express.Router();

// Route for uploading and creating a map
router.post('/upload', upload.single('file'), createMap); // Use the file upload middleware

// Route for adding points to a map
router.post('/addPoints', addPointsToMap);

// Route to get maps by floorId
router.get('/floor/:floorId', getMapsByFloor);

module.exports = router;