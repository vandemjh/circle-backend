const Router = require('express-promise-router');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');


module.exports = {
  jwtCheck: jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URI,
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    algorithms: ['RS256'],
  }),
  checkScopes: jwtAuthz([ undefined ])
    // app.use(jwtCheck, (err, req, res, next) => {
    //   // err.name === 'UnauthorizedError' // Add custom error messages here
    //   if (err.name === 'UnauthorizedError') {
    //     res.status(err.status).send('Unauthorized')
    //     return;
    //   }
    // }),
};

// router.get('/', function (req, res) {
//   try {
//     res.send('Secured Resource');
//   } catch (UnauthorizedError) {
//     res.send('Unauthorized');
//   }
// });
