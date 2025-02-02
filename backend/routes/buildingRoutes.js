const express = require('express');
const { createBuilding, getAllBuildings, deleteBuilding, getBuildingById} = require('../controller/buildingController');
const router = express.Router();

// Route to create a building
router.post('/create', createBuilding);

router.get('/get/:id', getBuildingById); // Added route for GET

// Route to get all buildings
router.get('/all', getAllBuildings);

// Route to delete a building by its ID
router.delete('/delete/:id', deleteBuilding);  // Added route for DELETE

module.exports = router;
