/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * custom modules
 */
const User = require('../models/user_model');


/**
 * Render the dashboard page
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */

const renderDashboard = async (req, res) => {
  try {
    
    // Get logged user username
    const { username } = req.session.user;

    // Get session user data
    const loggedUser = await User.findOne({ username })
    .select('totalVisits totalReactions blogPublished blogs')
    .populate({
      path: 'blogs',
      select: 'title createdAt updatedAt reaction totalVisit',
      options: { sort: { createdAt: 'desc'} }
    });

    res.render('./pages/dashboard', {
      sessionUser: req.session.user,
      loggedUser
    });

  } catch (error) {

    // Log error
    console.error('Error rendering dashboard: ', error.message);
    throw error;
    
  }

}

module.exports = renderDashboard;