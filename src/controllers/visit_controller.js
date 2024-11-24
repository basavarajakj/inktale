/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * custom modules
 */
const Blog = require('../models/blog_model');


/**
 * Retrieves and render the details of a blogs visit
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Error} - Throws an error if there's an issue during the process.
 */

const updateVisit = async (req, res) => {
  try {

    const { blogId } = req.params;

    const visitedBlog = await Blog.findById(blogId)
    .select('totalVisit owner')
    .populate({
      path: 'owner',
      select: 'totalVisits'
    });
    visitedBlog.totalVisit++;
    await visitedBlog.save();

    visitedBlog.owner.totalVisits++;
    await visitedBlog.owner.save();

    res.sendStatus(200);


  } catch (error) {
    
    console.error('Error updating totalVisit: ', error.message);
    throw error;
    
  }
}

module.exports = updateVisit;