const Router = require('express-promise-router');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256'],
});

module.exports = (app) => {
  app.use(jwtCheck, (err, req, res, next) => {
    // err.name === 'UnauthorizedError' // Add custom error messages here
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send('Internal error')
      return;
    }
  });
};

// router.get('/', function (req, res) {
//   try {
//     res.send('Secured Resource');
//   } catch (UnauthorizedError) {
//     res.send('Unauthorized');
//   }
// });
