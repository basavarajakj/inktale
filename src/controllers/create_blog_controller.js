/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * Render the register page
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderCreateBlog = (req, res) => {
  res.render('./pages/create_blog', {
    sessionUser: req.session.user,
    route: req.originalUrl
  });
};

const postCreateBlog = async (req, res) => {
 try {
  
  // Retrieve title and content from request body
  const { banner, title, content } = req.body;

 } catch (error) {

  // Log and throw error if any
  console.error('Error create new blog: ', error.message);
  throw error;
  
 }
  
}

module.exports = {
  renderCreateBlog,
  postCreateBlog
}