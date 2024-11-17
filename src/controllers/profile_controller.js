/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * custom modules
 */
const User = require('../models/user_model');
const getPagination = require('../utils/get_pagination_util');
const Blog = require("../models/blog_model");


/**
 * Retrieves profile information of a user and renders the profile page. 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @throws {Error} - If there is an error the process.
 */

const renderProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const userExists = await User.exists({ username });

    if (!userExists) {
      return res.render('./pages/404');
    }

    const profile = await User.findOne({ username })
    .select('profilePhoto username name bio blogs blog blogPublished createdAt');

    // Generate pagination
    const pagination = getPagination(`/profile/${username}`, req.params, 20, profile.blogs.length);

    const profileBlogs = await Blog.find({ _id: { $in: profile.blogs } })
    .select('title createdAt reaction totalBookmark readingTime')
    .populate({
      path: 'owner',
      select: 'name username profilePhoto'
    })
    .sort({ createdAt: 'desc' })
    .limit(pagination.limit)
    .skip(pagination.skip);

    res.render('./pages/profile', {
      sessionUser: req.session.user,
      profile,
      profileBlogs,
      pagination
    });
 
  } catch (error) {

    // Log error
    console.error("Error rendering profile: ", error.message);
    throw error
  }
}

module.exports = renderProfile;