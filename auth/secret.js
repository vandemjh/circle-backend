require('dotenv').config();
const Router = require('express-promise-router');

const router = new Router();
module.exports = router;

router.get('/', async (req, res) => {
  res.send({
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    DOMAIN: process.env.DOMAIN,
    REDIRECT_URI: process.env.REDIRECT_URI,
  });
});
