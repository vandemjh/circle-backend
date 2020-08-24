var cors = require('cors');

module.exports = (app) => {
  app.use(
    cors({
      origin: process.env.ORIGIN,
      // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // preflightContinue: false,
      // optionsSuccessStatus: 204,
      optionsSuccessStatus: 200, // legacy browser support
    })
  );
};
