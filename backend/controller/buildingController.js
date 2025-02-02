const Building = require('../models/Building');
const Floor = require('../models/Floor');
const mongoose = require('mongoose');

// Create a building along with floors
exports.createBuilding = async (req, res) => {
  const { name, address, floors } = req.body;

  if (!name || !address || !Number.isInteger(floors) || floors < 1) {
    return res.status(400).json({ success: false, message: "Invalid input data" });
  }

  try {
    // Step 1: Create the building
    const building = new Building({ name, address });
    await building.save();

    // Step 2: Create floors associated with the building
    const floorPromises = [];
    for (let i = 1; i <= floors; i++) {
      const floor = new Floor({
        floorNumber: i,
        building: building._id, // Reference the building
        map: null, // No map initially
      });

      floorPromises.push(floor.save());
    }

    // Wait for all floors to be created
    const createdFloors = await Promise.all(floorPromises);

    // Step 3: Add floor IDs to the building
    building.floors = createdFloors.map((floor) => floor._id);
    await building.save();

    // Step 4: Send the response with the populated building
    const populatedBuilding = await Building.findById(building._id).populate("floors");
    res.status(201).json({
      success: true,
      message: "Building and floors created successfully",
      data: populatedBuilding,
    });
  } catch (error) {
    console.error("Error creating building:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().populate('floors');
    res.status(200).json({ success: true, data: buildings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getBuildingById = async (req, res) => {
  const { buildingId } = req.params;

  // Validate the buildingId format using mongoose Types.ObjectId.isValid
  if (!mongoose.Types.ObjectId.isValid(buildingId)) {
    return res.status(400).json({ success: false, message: 'Invalid building ID format' });
  }

  try {
    // Attempt to find the building by its ID
    const building = await Building.findById(buildingId).populate('floors');

    // If no building is found with that ID
    if (!building) {
      return res.status(404).json({ success: false, message: 'Building not found' });
    }

    // If the building is found, send it back in the response
    res.status(200).json({
      success: true,
      data: building,
    });
  } catch (error) {
    console.error("Error fetching building by ID:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Delete a building along with its associated floors
exports.deleteBuilding = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid building ID format' });
  }

  try {
    // Find the building to delete
    const building = await Building.findById(id);

    if (!building) {
      return res.status(404).json({ success: false, message: 'Building not found' });
    }

    // Delete the associated floors first
    await Floor.deleteMany({ building: id });

    // Delete the building
    await Building.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Building and associated floors deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting building:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
