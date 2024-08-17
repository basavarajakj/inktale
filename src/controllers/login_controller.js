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


/**
 * Render the login page.
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */
const renderLogin = (req, res) => {

  const { userAuthenticated } = req.session.user || {};

  // Handle case where user already logged in
  if (userAuthenticated) {
    return res.redirect('/');
  }
  
  res.render('./pages/login');
}


/**
 * Handles the login precess for a user.
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise<void>} - A promise representing the asynchronous operation.
 */

const postLogin = async (req, res) => {
  try {
    
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user from database by email
    const currentUser = await User.findOne({ email });

    // Handle case user not found in database
    if(!currentUser) {
      return res.status(400).json({ message: 'Invalid credentials. Please ensure you\'ve entered the correct credentials and try again'})
    }

    // Check if password is valid
    const passwordIsValid = await bcrypt.compare(password, currentUser.password);
    
    // Handle case where password is invalid
    if(!passwordIsValid) {
      return res.status(400).json({ message: 'Invalid credentials. Please ensure you\'ve entered the correct credentials and try again'});
    }

    // Set session userAUthenticated to true and redirect to homepage
    req.session.user = {
      userAuthenticated: true,
      name: currentUser.name,
      username: currentUser.username,
      profilePhotoURL: currentUser.profilePhoto?.url
    }

    return res.redirect('/')
    
    
  } catch (error) {
    
    console.log('postLogin: ', error.message);
    

  }
}

module.exports = {
  renderLogin,
  postLogin
}