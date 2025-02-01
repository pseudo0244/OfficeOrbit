const express = require("express");
const upload = require("../middleware/fileUploadMiddleware"); // Import your existing middleware
const { uploadFile } = require("../controller/fileUploadController"); // Import the Cloudinary upload function
const router = express.Router();

// POST route for file upload
router.post("/upload", upload.single("file"), uploadFile); // Use the uploadFile controller to handle Cloudinary upload

module.exports = router;
