/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * Controller function to render home page with blog data.
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Promise<void>} - Throws an error if there's an issue rendering the home page.
 */
const renderHome = async (req, res) => {
  try {
    
    res.render('./pages/home', {
      sessionUser:req.session.user
    });

  } catch (error) {

    // Log and throw error if there's an issue rendering the home page
    console.log('Error rendering home page: ', error.message);
    throw error;

  }
}

module.exports = renderHome;