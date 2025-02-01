const express = require('express');
const { addPoint, getPointsByMap } = require('../controller/pointController');
const router = express.Router();

router.post('/add', addPoint); // Add a new point
router.get('/:mapId', getPointsByMap); // Get all points for a map

module.exports = router;
