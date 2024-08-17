/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * node modules
 */
const router = require('express').Router();


/**
 * custom modules
 */
const { renderCreateBlog } = require('../controllers/create_blog_controller'); 


// GET route: Render the blog create page
router.get('/', renderCreateBlog);


module.exports = router;