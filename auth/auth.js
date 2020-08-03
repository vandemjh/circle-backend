const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const crypto = require('crypto');
const base64url = require('base64url');
const Router = require('express-promise-router');
const router = new Router();

var code_verifier = process.env.CODE_VERIFIER;
var hash = crypto.createHash('sha256').update(code_verifier).digest();
var CODE_CHALLENGE = base64url.encode(hash);

module.exports = router;

const oidc = new ExpressOIDC({
  issuer: process.env.ISSUER,
  client_id: process.env.CLIENT_ID,
  client_secret: CODE_CHALLENGE,
  appBaseUrl: process.env.APP_BASE_URL,
  redirect_uri: process.env.REDIRECT_URI,
  scope: process.env.SCOPE,
});

router.use(
  session({
    secret: CODE_CHALLENGE,
    resave: true,
    saveUninitialized: false,
  })
  );
  
router.use(oidc.router);

router.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
  res.send("success!!");
});

router.get('/implicit/callback', oidc.ensureAuthenticated(), (req, res) => {
  res.send("implicit-callback success!!");
});
