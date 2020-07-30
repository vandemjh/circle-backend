const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const result = await db
    .query('SELECT * FROM posts WHERE pid = $1', [pid])
    .catch((err) => {
      console.log('Should create a response object here' + err);
    });
  res.send(!!result ? result.rows : []);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM posts ORDER BY created_at');
  res.send(result.rows);
});

router.get('/postedSince/:created_at', async (req, res) => {
  var createdAt = req.params.created_at;
  const result = await db.query('SELECT * FROM posts WHERE created_at > $1', [
    createdAt,
  ]);
  res.send(result.rows);
});

router.post('/', async (req, res) => {
  const result = await db.query('INSERT INTO posts(post) VALUES($1)', [
    req.body,
  ]);
  // throw new Error("broken")
  res.send(result.rowCount >= 1);
});
