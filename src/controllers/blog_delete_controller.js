/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * custom modules
 */
const Blog = require('../models/blog_model');
const User = require('../models/user_model');


const deleteBlog = async (req, res) => {
  try{

    const { blogId } = req.params;

    const { username }= req.session.user;

    const deletedBlog = await Blog.findOne({ _id: blogId })
      .select('reaction totalVisit');

    const currentUser = await User.findOne({ username })
      .select('blogPublished totalVisits totalReactions');

    currentUser.blogPublished--;
    currentUser.totalVisits -= deletedBlog.totalVisit;
    currentUser.totalReactions -+ deleteBlog.reaction;
    currentUser.blogs.splice(currentUser.blogs.indexOf(blogId), 1);
    await currentUser.save();

    await Blog.deleteOne({ _id: blogId });

    res.sendStatus(200);

  } catch(error) {

    // Log error
    console.error('Error deleting blog: ', error.message);
    throw error;
    
  }
}

module.exports = deleteBlog;