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
const deleteBlog = require('../controllers/blog_delete_controller');


//DELETE route: Delete blog
router.delete('/:blogId/delete', deleteBlog);

module.exports = router;