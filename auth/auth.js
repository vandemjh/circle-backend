const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const crypto = require('crypto');
const base64url = require('base64url');
const Router = require('express-promise-router');
const router = new Router();

module.exports = router;

var code_verifier = process.env.CODE_VERIFIER;
var hash = crypto.createHash('sha256').update(code_verifier).digest();
var CODE_CHALLENGE = base64url.encode(hash);

console.log(CODE_CHALLENGE)

// session support is required to use ExpressOIDC
router.use(
  session({
    secret: CODE_CHALLENGE,
    resave: true,
    saveUninitialized: false,
  })
);
  
const oidc = new ExpressOIDC({
  issuer: process.env.ISSUER,
  client_id: process.env.CLIENT_ID,
  client_secret: CODE_CHALLENGE,
  appBaseUrl: process.env.APP_BASE_URL,
  loginRedirectUri: process.env.LOGIN_REDIRECT_URI,
  logoutRedirectUri: process.env.LOGOUT_REDIRECT_URI
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
router.use(oidc.router);
