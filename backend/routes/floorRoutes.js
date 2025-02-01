const express = require('express');
const { createFloor, getFloorsByBuilding } = require('../controller/floorController');
const router = express.Router();

router.post('/create', createFloor); // Create a floor
router.get('/:buildingId', getFloorsByBuilding); // Get all floors for a specific building

module.exports = router;
