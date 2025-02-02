const Map = require('../models/Map');
const Point = require('../models/Point');
const Floor = require('../models/Floor');
const cloudinary = require('cloudinary').v2;
const { uploadFile } = require('../controller/fileUploadController'); 

const fs = require('fs');

exports.createMap = async (req, res) => {
  const { floorId } = req.body;

  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Validate the floorId
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ success: false, message: 'Floor not found' });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'officeorbit', // Optional: Specify a folder on Cloudinary
    });

    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Create a new map with the Cloudinary URL
    const newMap = new Map({
      floor: floorId,       // Reference to the floor
      mapImagePath: result.secure_url, // Use the Cloudinary URL
      points: [],           // Initialize with an empty array of points
    });

    await newMap.save();
    res.status(201).json({ success: true, data: newMap });
  } catch (error) {
    console.error('Error creating map:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add points to the map
exports.addPointsToMap = async (req, res) => {
  const { mapId, points } = req.body;  // points is an array of Point IDs

  try {
    const map = await Map.findById(mapId);
    if (!map) {
      return res.status(404).json({ success: false, message: 'Map not found' });
    }

    // Add the points to the map
    map.points.push(...points);  // Push the point references to the map
    await map.save();

    res.status(200).json({ success: true, data: map });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get maps by floorId
exports.getMapsByFloor = async (req, res) => {
  const { floorId } = req.params;

  try {
    const maps = await Map.find({ floor: floorId }); // Find maps where the floorId matches
    if (maps.length === 0) {
      return res.status(404).json({ success: false, message: 'No maps found for this floor' });
    }
    res.status(200).json({ success: true, data: maps });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};