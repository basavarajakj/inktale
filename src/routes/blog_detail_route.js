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
const renderBlogDetail = require('../controllers/blog_detail_controller');
const { updateReaction, deleteReaction} = require('../controllers/reaction_controller');
const { addToReadingList, removeFromReadingList } = require('../controllers/readingList_controller');
const updateVisit = require('../controllers/visit_controller');


// GET route: Render the blog create page
router.get('/:blogId', renderBlogDetail);

// PUT route: Update blog reactions.
router.put('/:blogId/reactions', updateReaction);

// DELETE route: Delete blog reactions
router.delete('/:blogId/reactions', deleteReaction);

// PUT route: update readingList
router.put('/:blogId/readingList', addToReadingList);

// DELETE route: remove reading list
router.delete('/:blogId/readingList', removeFromReadingList);

// PUT route: Update blog visit
router.put('/:blogId/visit', updateVisit);


module.exports = router;