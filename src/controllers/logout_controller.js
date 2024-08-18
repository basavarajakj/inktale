/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

 
/**
 * Logout the user by destroying the session and redirecting t the home page
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */

const logout = async (req, res) => {
  try {

    // Delete user session
    req.session.destroy((error) => {
      if (error) {
        console.error('Error destroying session during logout: ', err.message);
        return res.status(500).send('Error during logout. Please try again.');
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid');

      // Redirect to login page
      res.redirect('/login');
    });

  } catch (error) {
 
    // log and throw error
    console.error('Error logout: ', error.message);
    throw error;
  }

}

module.exports = logout;