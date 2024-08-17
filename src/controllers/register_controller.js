/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * node module
 */
const bcrypt = require('bcrypt');


/**
 * custom modules
 */
const User = require('../models/user_model');
const generateUsername = require('../utils/generate_username_util');

/**
 * Render the register page
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderRegister = (req, res) => {

  const { userAuthenticated } = req.session.user || {};

  // Handle case where user already registered in
  if (userAuthenticated) {
    return res.redirect('/');
  }

  res.render('./pages/register');
}

/**
 * Handles the registration process for a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object
 * @returns {Promise<void>} - A Promise that resolved after register process is completed.
 * @throws {Error} - If an error occurs during register process.
 */

const postRegister = async (req, res) => {
  try {
    
    //Extract user data from request body
    const { name, email, password} = req.body;
    // create username
    const username = generateUsername(name);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user with provided data
    await User.create({ name, email, password: hashedPassword, username });

    // Redirect user to login page upon successful signup 
    res.redirect('/login');
    
  } catch (error) {
    
    if(error.code === 11000) {

      if(error.keyPattern.email) {
        return res.status(400).send({ message: 'This email is already associated with an account.' });
      }

      if(error.keyPattern.username) {
        return res.status(400).send({ message: 'This username is already in use.' });
      }

    } else {

      return res.status(400).send({ message: `Failed to register user.<br>${error.message}` });

    }

    console.log('postRegister: ', error.message);
    throw error

  }
}

module.exports = {
  renderRegister,
  postRegister
}