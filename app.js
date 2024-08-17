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
const session = require('express-session');
const MongoStore = require('connect-mongo');


/**
 * custom modules
 */
const register = require('./src/routes/register_route');
const login = require('./src/routes/login_route');
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
app.use(express.urlencoded({ extended: true }));


/**
 * instances for session storage
 */
const store = new MongoStore({
  mongoUrl: process.env.MANGO_CONNECTION_URI,
  collectionName: 'session',
  dbName: 'inktale'
})

/**
 * initial express session
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE)
  }
}))


/**
 * register page
 */

app.use('/register', register);


/**
 * login page
 */
app.use('/login', login)

/**
 * start server
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(3000, async ()=> {
  console.log(`server listening on port http://locahost:${PORT}`);

  await connectDB(process.env.MANGO_CONNECTION_URI);
});

server.on('close', async () => await disconnectDB());