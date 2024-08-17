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
const renderHome = require('../controllers/home_controller');

// GET route: Render the home form
router.get('/', renderHome);

module.exports = router;