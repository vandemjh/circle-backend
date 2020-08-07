const users = require('./routes/users');
const debug = require('./routes/debug');
const posts = require('./routes/posts');
const secrets = require('./auth/secrets');

module.exports = (app) => {
  app.use('/hello-world', (req, res) => res.send('hello world!'));
  app.use('/users', users);
  app.use('/debug', debug);
  app.use('/posts', posts);
  app.use('/secrets', secrets);
};
