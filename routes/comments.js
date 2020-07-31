const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  const result = await db.query('SELECT * FROM comments WHERE cid = $1', [id]);
  res.send(result.rows);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM comments');
  res.send(utils.stringify(result.rows));
});

router.post('/', async (req, res) => {
  var comment = req.body.comment;
  var commentor = req.body.commentor;
  const result = await db.query(
    'INSERT INTO comments(comment, commentor) VALUES($1, $2) RETURNING *',
    [comment, commentor]
  );
  res.send(result.rows);
});
