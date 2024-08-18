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
 * custom modules
 */
const Blog = require('../models/blog_model');


/**
 * Retrieves and render the details of a blog
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {Error} - Throws an error if there's an issue during the process.
 */
const renderBlogDetail = async (req, res) => {
  try {

    // Destructure blogId form req.params
    const { blogId } = req.params;
    
    // Handle case where the provided BlogId is not a valid Mongoose ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);
    if (!isValidObjectId) {
      return res.render('./pages/404');
    }

    // Handle case where no blog found with provided blogId
    const blogExists = await Blog.exists({ _id: new mongoose.Types.ObjectId(blogId)});
    if(!blogExists) {
      return res.render('./pages/404');
    }

    // Retrieve blog details and populate owner info
    const blog = await Blog.findById(blogId)
      .populate({
        path: 'owner',
        select: 'name username profilePhoto'
      });
      
      // Retrieve more blog from blog owner
      const ownerBlogs = await Blog.find({ owner: { _id: blog.owner._id} })
        .select('title reaction totalBookmark owner readingTime createdAt')
        .populate({
          path: 'owner',
          select: 'name username profilePhoto'
        })
        // Get more blog without current blog
        .where('_id').nin(blogId)
        .sort({ createdAt: 'desc' })
        .limit(3);

      res.render('./pages/blog_detail', {
        sessionUser: req.session.user,
        blog,
        ownerBlogs
      });

    
  } catch (error) {

    // Log and throw error
    console.error('Error rendering the blog detail page', error.message);
    throw error;

  }
}


module.exports = renderBlogDetail;