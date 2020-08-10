const db = require('../db/access');
const Router = require('express-promise-router');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:lid', async (req, res) => {
  const id = req.params.lid;
  const result = await db.query('SELECT * FROM likes WHERE lid = $1', [id]);
  if (result.rowCount == 0) res.send([])
  res.send(result.rows);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM likes');
  res.send(result.rows);
});

router.post('/', async (req, res) => {
  var like = req.body.like;
  var liker = req.body.liker;
  const result = await db.query(
    'INSERT INTO likes(lid, liker) VALUES($1, $2) RETURNING *',
    [like, liker]
  );
  res.send(result.rows);
});
