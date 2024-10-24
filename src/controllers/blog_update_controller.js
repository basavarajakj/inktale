/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * custom modules
 */
const Blog = require('../models/blog_model');
const uploadToCloudinary = require('../config/cloudinary_config');


const renderBlogEdit = async (req, res) => {
  try {

    // Get blog from request parameter
    const { blogId } = req.params;

    const { username } = req.session.user;

    // Find the blog user want to edit by its' id
    const currentBlog = await Blog.findById(blogId)
      .select('banner title content owner')
      .populate({
        path: 'owner',
        select: 'username'
      });

    // Handle user where current user try to edit other users blog
    if (currentBlog.owner.username !== username) {
      return res.status(403).send('<h2>Sorry, you don\'t have permission to edit this article as you\'re not author.</h2>')
    }

    res.render('./pages/blog_update', {
      sessionUser: req.session.user,
      currentBlog
    });

    
  } catch (error) {

    // log error
    console.error("Error rendering blog edit page: ", error.message);
    throw error;
  }

}


const updateBlog = async (req, res) => {
  try {
    
    /**
     * Retrieve blog id from request param
     * and blog title, content, banner from request body
     */
    console.log(req.body);
    const { blogId } = req.params;
    const { title, content, banner } = req.body;


    // Find the blog user want to update
    const updatedBlog = await Blog.findById(blogId)
    .select('banner title content updatedAt')

    if (banner) {
      // upload nwe banner in cloudinary
      const bannerURL = await uploadToCloudinary(banner, updatedBlog.banner.public_id);
      updatedBlog.banner.url = bannerURL;
    }

    // Update blog title and content and save to database
    updatedBlog.title = title;
    updatedBlog.content = content;

    await updatedBlog.save();

    res.sendStatus(200);

  } catch (error) {
    
    // log error
    console.error("Error updating blog: ", error.message);
    throw error
  }
}


module.exports = {
  renderBlogEdit,
  updateBlog
}