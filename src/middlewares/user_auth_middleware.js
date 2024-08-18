/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * Middleware function to check is user is authenticated.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */

const userAuth = (req, res, next) => {
  
  // retrieves the 'userAuthenticated' property from 'user'-> session object. If the 'session.user' object is not defined or is empty. it defaults to an empty object('{}'). This allows safe access to 'userAuthenticated' without throwing errors due to undefined objects or property 
  const { userAuthenticated } = req.session.user || {};

  // Handle case where user is authenticated
  if (userAuthenticated) return next();

  // Redirect to login page if user is not authenticated
  res.redirect('/login')

}


module.exports = userAuth;