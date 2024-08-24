/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * custom modules
 */
const User = require('../models/user_model');
const Blog = require('../models/blog_model');

const addToReadingList = async (req, res) => {
  try {
    
    // Check if user is authenticated
    if (!req.session.user) return res.sendStatus(401);

     // Destructure username from session and blog id
     const { username } = req.session.user;
     const { blogId } = req.params;

     /**
      * Find current logged user and check,
      * if already added current blog to reading list
      */
     const loggedUser = await User.findOne({ username }).select('readingList')
     if (loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
     }

     // update logged user reading list
     loggedUser.readingList.push(blogId);
     await loggedUser.save();

     // Find the totalBookmark list and update
     const readingListedBlog = await Blog.findById(blogId)
       .select('totalBookmark')
     readingListedBlog.totalBookmark++;
     await readingListedBlog.save();

     res.sendStatus(200);

  } catch (error) {
    
    // Log error
    console.error('Error updating reading list: ', error.message);
    throw error;
  }
};

const removeFromReadingList = async (req, res) => {
  try {
    
    // handle case where user not authenticated
    if (!req.session.user) return res.sendStatus(401);

    // Destructure username from session 
    const { username } = req.session.user;
    const { blogId } = req.params;

    // case where blog is not contain in reading list
    const loggedUser = await User.findOne( { username }).select('readingList');
    if (!loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Update user reading list and save
    loggedUser.readingList.splice(loggedUser.readingList.indexOf(blogId), 1);
    await loggedUser.save();

    // Find the totalBookmark and update
    const readingListedBlog = await Blog.findById(blogId)
      .select('totalBookmark');
    readingListedBlog.totalBookmark--;
    await readingListedBlog.save();
    
    res.sendStatus(200);
    
  } catch (error) {
    
    // log error
    console.error('Error removing reading list: ', error.message);
    throw error;

  }
}



module.exports = {
  addToReadingList,
  removeFromReadingList
}