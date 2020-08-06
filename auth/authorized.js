const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

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

router.use(jwtCheck);

router.get('/', function (req, res) {
  try {
    res.send('Secured Resource');
  } catch (UnauthorizedError) {
    res.send('Unauthorized');
  }
});
