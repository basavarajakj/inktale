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

const { renderRegister } = require('../controllers/register_controller')


// GET route: Render the registration form.
router.get('/', renderRegister);


module.exports = router;