require('dotenv').config();
const express = require('express');
const utils = require('./utils/utils');
const mountRoutes = require('./router');
var logging = require('./utils/logger');
var mountErrors = require('./utils/error')

const APP = express();
const PORT = process.env.PORT;

if (process.env.SKIP_LOGGING === true) logging.logger(APP);
mountRoutes(APP);
mountErrors(APP);
if (process.env.SKIP_LOGGING === true) logging.errorLogger(APP);

if (process.env.STARTUP === true) utils.startup();
if (process.env.TEST_POSTS === true) utils.testPosts();

APP.listen(PORT, () =>
  console.log(
    `Listening on http://localhost:${PORT} in ${APP.settings.env} mode`
  )
);
