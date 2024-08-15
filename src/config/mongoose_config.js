/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * node modules
 */
const mongoose = require('mongoose');

/**
 * Client options object connecting server API configuration.
 * @type {ClientOptions}
 */
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
}


/**
 * Connects to the MongoDB database using the provided connection string.
 * 
 * @param {string} connectionStr - The MongoDB connection string.
 * @return {Promise<void>} - A promise that resolves when the connection is successfully established
 * @throws {Error} - If throws's an error during the connection process.
 */
const connectDB = async (connectionURI) => {
  try {

    await mongoose.connect(connectionURI, clientOptions);
    console.log('Connected to mongoDB');

  } catch (error) {
    
    console.error('Error connecting to mongoDB', error.message);
    throw error;
    
  }
}

/**
 * Disconnects from the MongoDB database using Mongoose.
 * @async
 * @function disconnectDB
 * @throws {Error} If an error occurs during disconnection.
 * @returns {Promise<void>} A promise that resolves once disconnection is complete
 */
const disconnectDB = async () => {
  try {

    await mongoose.disconnect();
    console.log('Disconnected from mongoDB');

  } catch (error) {
    
    console.error('Error disconnecting from mongoDB', error.message);
    throw error;

  }
}

module.exports = {
  connectDB,
  disconnectDB
}