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


const updateReaction = async (req, res) => {
  try {
    
    // handle case where user not authenticated
    if (!req.session.user) return res.sendStatus(401);

    // Destructure username from session 
    const { username } = req.session.user;

    const { blogId } = req.params;

    // case where user already reacted
    const currentUser = await User.findOne( { username }).select('reactedBlogs');
    if (currentUser.reactedBlogs.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Find the blog and update its reaction count
    const reactedBlog = await Blog.findById(blogId)
      .select('reaction owner')
      .populate({
        path: 'owner',
        select: 'totalReactions'
      });
      reactedBlog.reaction++;
      await reactedBlog.save();

      // Update current user's reactionBlogs list and save
      currentUser.reactedBlogs.push(reactedBlog._id);
      await currentUser.save();

      // Update blog author's total reaction list and save
      reactedBlog.owner.totalReactions++;
      await reactedBlog.owner.save();

      res.sendStatus(200);
    
  } catch (error) {
    
    // Log and throw error
    console.error('Error updating reaction: ', error.message);
    throw error;

  }
}

const deleteReaction = async (req, res) => {
  try {
    
    // handle case where user not authenticated
    if (!req.session.user) return res.sendStatus(401);

    // Destructure username from session 
    const { username } = req.session.user;

    const { blogId } = req.params;

    // case where user not reacted
    const currentUser = await User.findOne( { username }).select('reactedBlogs');
    if (!currentUser.reactedBlogs.includes(blogId)) {
      return res.sendStatus(400);
    }

    // Find the blog and update its reaction count
    const reactedBlog = await Blog.findById(blogId)
      .select('reaction owner')
      .populate({
        path: 'owner',
        select: 'totalReactions'
      });
      reactedBlog.reaction--;
      await reactedBlog.save();

      // Update current user's reactionBlogs list and save
      currentUser.reactedBlogs.splice(currentUser.reactedBlogs.indexOf(blogId), 1);
      await currentUser.save();

      // Update blog author's total reaction list and save
      reactedBlog.owner.totalReactions--;
      await reactedBlog.owner.save();

      res.sendStatus(200);
    
  } catch (error) {
    
    // Log and throw error
    console.error('Error deleting reaction: ', error.message);
    throw error;

  }
}

module.exports = { 
  updateReaction,
  deleteReaction
}