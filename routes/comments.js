const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  const result = await db.query('SELECT * FROM comments WHERE cid = $1', [id]);
  // if (result.rowCount == 0) res.send([])
  res.send(result.rows);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM comments');
  res.send(result.rows);
});

router.post('/', async (req, res) => {
  var cid = req.body.cid;
  var comment = req.body.comment;
  var commenter = req.body.commenter;
  const result = await db.query(
    'INSERT INTO comments(cid, comment, commenter) VALUES($1, $2, $3) RETURNING *',
    [cid, comment, commenter]
  );
  // res.send(result.rows);
  res.send(true);
});
