var protect = require('./auth/protect');
const users = require('./routes/users');
const debug = require('./routes/debug');
const posts = require('./routes/posts');
const secrets = require('./auth/secrets');
const upload = require('./routes/upload');

if (process.env.SKIP_TOKENS === 'true') protect = null;

module.exports = (app) => {
  app.use('/secrets', secrets);
  if (process.env.DEBUG === 'true') app.use('/debug', debug);
  app.use('/users', protect.jwtCheck, users);
  app.use('/posts', protect.jwtCheck, posts);
  app.use('/upload', protect.jwtCheck, upload);
};
