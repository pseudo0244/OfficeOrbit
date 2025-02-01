const cloudinary = require("cloudinary").v2;

const initializeCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary name from .env
    api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key from .env
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret from .env
  });

  console.log("Cloudinary configuration initialized");
};

module.exports = initializeCloudinary;
