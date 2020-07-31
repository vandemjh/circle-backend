const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:uid', async (req, res) => {
  const id = req.params.uid;
  const result = await db.query(`SELECT * FROM users WHERE uid = $1`, [id]);
  res.send(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query(`SELECT * FROM users`);
  res.send(utils.stringify(result.rows));
});

router.post('/', async (req, res) => {
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var profilepictureurl = req.body.profilepictureurl;
  const result = await db.query(
    `INSERT INTO users(username, firstname, lastname, profilepictureurl) VALUES($1, $2, $3, $4) RETURNING *`,
    [username, firstname, lastname, profilepictureurl]
  );
  res.send(result.rows);
});
