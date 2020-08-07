require('dotenv').config();
const Router = require('express-promise-router');

const router = new Router();
module.exports = router;

router.get('/', async (req, res) => {
  res.send({
    // grant_type: process.env.GRANT_TYPE,
    audience: process.env.AUDIENCE,
    /**
     * Your Auth0 account domain such as `'example.auth0.com'`,
     * `'example.eu.auth0.com'` or , `'example.mycompany.com'`
     * (when using [custom domains](https://auth0.com/docs/custom-domains))
     */
    domain: process.env.DOMAIN,
    /**
     * The issuer to be used for validation of JWTs, optionally defaults to the domain above
     */
    issuer: undefined,
    /**
     * The Client ID found on your Application settings page
     */
    client_id: process.env.CLIENT_ID,
    /**
     * The default URL where Auth0 will redirect your browser to with
     * the authentication result. It must be whitelisted in
     * the "Allowed Callback URLs" field in your Auth0 Application's
     * settings. If not provided here, it should be provided in the other
     * methods that provide authentication.
     */
    redirect_uri: undefined,
    /**
     * The value in seconds used to account for clock skew in JWT expirations.
     * Typically, this value is no more than a minute or two at maximum.
     * Defaults to 60s.
     */
    leeway: undefined,
    /**
     * The location to use when storing cache data. Valid values are `memory` or `localstorage`.
     * The default setting is `memory`.
     */
    cacheLocation: process.env.CACHE_LOCATION,
    /**
     * If true, refresh tokens are used to fetch new access tokens from the Auth0 server. If false, the legacy technique of using a hidden iframe and the `authorization_code` grant with `prompt=none` is used.
     * The default setting is `false`.
     *
     * **Note**: Use of refresh tokens must be enabled by an administrator on your Auth0 client application.
     */
    useRefreshTokens: undefined,
    /**
     * A maximum number of seconds to wait before declaring background calls to /authorize as failed for timeout
     * Defaults to 60s.
     */
    authorizeTimeoutInSeconds: undefined
  });
});
