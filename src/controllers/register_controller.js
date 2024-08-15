/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * Render the register page
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderRegister = (req, res) => {
  res.render('./pages/register');
}

/**
 * Handles the registration process for a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object
 * @returns {Promise<void>} - A Promise that resolved after register process is completed.
 * @throws {Error} - If an error occurs during register process.
 */

const postRegister = (req, res) => {
  
  console.log(req.body);
  
}

module.exports = {
  renderRegister,
  postRegister
}