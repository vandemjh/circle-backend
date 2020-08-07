require('dotenv').config();
const express = require('express');
const utils = require('./utils/utils');
const mountRoutes = require('./router');
const protectRoutes = require('./auth/protectRoutes');
var logging = require('./utils/logger');

const APP = express();
const PORT = process.env.PORT;

if (!process.env.SKIP_LOGGING) logging.logger(APP);
if (process.env.SKIP_TOKENS) protectRoutes(APP);
mountRoutes(APP);
if (!process.env.SKIP_LOGGING) logging.errorLogger(APP);

if (process.env.STARTUP === 'true') utils.startup();
if (process.env.TEST_POSTS === 'true') utils.testPosts();

APP.listen(PORT, () =>
  console.log(
    `Listening on http://localhost:${PORT} in ${APP.settings.env} mode`
  )
);
