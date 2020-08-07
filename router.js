var protect = require('./auth/protect');
const users = require('./routes/users');
const debug = require('./routes/debug');
const posts = require('./routes/posts');
const secrets = require('./auth/secrets');

if (process.env.SKIP_TOKENS === true) protect = null;

module.exports = (app) => {
  app.use('/hello-world', protect.jwtCheck, (req, res) => res.send('hello world!'));
  app.use('/users', protect.jwtCheck, users);
  app.use('/debug', protect.jwtCheck, debug);
  app.use('/posts', protect.jwtCheck, posts);
  app.use('/secrets', secrets);
};
