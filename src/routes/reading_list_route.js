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
const { renderReadingList } = require('../controllers/readingList_controller');


// GET route: Render the reading list page
router.get(['/', '/page/:pageNumber'], renderReadingList);

module.exports = router;