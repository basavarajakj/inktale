/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * node modules
 */
const express = require('express');
require('dotenv').config();

/**
 * custom modules
 */
const register = require('./src/routes/register_route.js')
const { connectDB, disconnectDB } = require('./src/config/mongoose_config');

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


/**
 * parse urlencoded body
 */
app.use(express.urlencoded({ extended: true }))


/**
 * Register page
 */

app.use('/register', register)


/**
 * start server
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(3000, async ()=> {
  console.log(`server listening on port http://locahost:${PORT}`);

  await connectDB(process.env.MANGO_CONNECTION_URI);
});

server.on('close', async () => await disconnectDB());