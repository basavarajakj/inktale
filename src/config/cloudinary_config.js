/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * node modules
 */
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

/**
 * Configure Cloduinary settings for image uploads
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (image, public_id) => {
  try {
    const response = await cloudinary.uploader.upload(image, {
      resource_type: 'auto',
      public_id
    });

    return response.secure_url;
  } catch(error) {
    console.error('Error uploading image to cloudinary: ', error.message);
    throw error;
  }
}

module.exports = uploadToCloudinary;