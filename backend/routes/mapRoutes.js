const express = require('express');
const { createMap } = require('../controller/mapController');
const upload = require('../middleware/fileUploadMiddleware');
const router = express.Router();

router.post('/upload', upload.single('map'), createMap); // Upload a map

module.exports = router;
