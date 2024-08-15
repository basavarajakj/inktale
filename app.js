/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * node modules
 */
const express = require('express');

/**
 * custom modules
 */
const register = require('./src/routes/register_route.js')

/**
 * Initial express
 */
const app = express();

/**
 * setting view page
 */
app.set('view engine', 'ejs');

/**
 * setting public directory
 */
app.use(express.static(`${__dirname}/public`));


app.use('/register', register)


/**
 * start server
 */
app.listen(3000, ()=> {
  console.log('server listening on port http://locahost:3000');
});
