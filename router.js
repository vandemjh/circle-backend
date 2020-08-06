const users = require('./routes/users.js');
const debug = require('./routes/debug.js');
const posts = require('./routes/posts.js');
const secrets = require('./auth/secrets.js');
const authorized = require('./auth/authorized.js');

module.exports = (app) => {
  app.use('/hello-world', (req, res) => res.send('hello world!'));
  app.use('/users', users);
  app.use('/debug', debug);
  app.use('/posts', posts);
  app.use('/secrets', secrets);
  app.use('/authorized', authorized);
};
