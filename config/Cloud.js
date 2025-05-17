const cloudinary = require('cloudinary').v2;
require('dotenv').config();
if (!process.env.CLOUD_NAME || !process.env.CLOUD_KEY || !process.env.CLOUD_SECRET) {
  console.error('Error: Missing required Cloudinary environment variables.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

module.exports = cloudinary;