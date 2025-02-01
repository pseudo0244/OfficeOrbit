const express = require('express');
const { addPoint, getPointsByMap } = require('../controller/pointController');
const router = express.Router();

// Route for adding a new point to the map
router.post('/add', addPoint); // Add a new point

// Route for getting all points for a specific map
router.get('/:mapId', getPointsByMap); // Get all points for a map

module.exports = router;
