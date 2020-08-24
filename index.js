require('dotenv').config();
const express = require('express');
const utils = require('./utils/utils');
const mountRoutes = require('./router');
const mountCors = require('./utils/cors');
var logging = require('./utils/logger');
const mountErrors = require('./utils/error');

const APP = express();
if (process.env.NODE_ENV === 'production') {
  process.env.DEBUG = undefined;
  // process.env.STARTUP = undefined;
  process.env.DROP_TABLES = undefined;
  process.env.TEST_POSTS = undefined;
  process.env.SKIP_LOGGING = undefined;
  process.env.SKIP_TOKENS = undefined;
}
const PORT = process.env.PORT;

if (process.env.SKIP_LOGGING !== 'true') logging.logger(APP);
mountCors(APP);
mountRoutes(APP);
mountErrors(APP);
if (process.env.SKIP_LOGGING !== 'true') logging.errorLogger(APP);

(async () => {
  if (process.env.DROP_TABLES === 'true') await utils.dropTables();
  if (process.env.STARTUP === 'true') await utils.startup();
  await utils.wait(); // Short delay
  if (process.env.TEST_POSTS === 'true') await utils.testPosts();
})();

APP.listen(PORT, () =>
  console.log(
    `Listening on http://localhost:${PORT} in ${APP.settings.env} mode`
  )
);
