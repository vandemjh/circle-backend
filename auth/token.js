const crypto = require('crypto');

/**
 * Creates code_verifier.
 * @param {string} str encodes string in base 64
 */
function base64URLEncode(str) {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));

/**
 * Generates a code_challenge to exchange for authorization_code.
 * @param {string} buffer code_verifier
 */
function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));
