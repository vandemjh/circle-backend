const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const crypto = require('crypto')
const base64url = require('base64url')

var code_verifier = process.env.CODE_VERIFIER
var hash = crypto.createHash('sha256').update(code_verifier).digest();
var code_challenge = base64url.encode(hash)

// session support is required to use ExpressOIDC
app.use(session({
  secret: code_challenge,
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: process.env.ISSUER,
  client_id: process.env.CLIENT_ID,
  client_secret: code_challenge,
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'circle-api'
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);