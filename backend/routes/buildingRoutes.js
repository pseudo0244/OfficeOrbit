const express = require('express');
const { createBuilding, getAllBuildings } = require('../controller/buildingController');
const router = express.Router();

router.post('/create', createBuilding); // Create a building
router.get('/all', getAllBuildings);   // Get all buildings

module.exports = router;
