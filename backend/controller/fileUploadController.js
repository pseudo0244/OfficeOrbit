const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary upload handler
const uploadFile = async (req, res) => {
  try {
    // If no file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'officeorbit', // Optional: You can specify a folder on Cloudinary
    });

    // Delete the local file after uploading it to Cloudinary
    fs.unlinkSync(req.file.path);

    // Return the Cloudinary URL and other info in the response
    res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        ...req.file,
        cloudinaryUrl: result.secure_url, // Cloudinary URL for the uploaded file
      },
    });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ message: 'Failed to upload file to Cloudinary', error: error.message });
  }
};

module.exports = { uploadFile };
