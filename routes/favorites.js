const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:fid', async (req, res) => {
  const fid = req.params.fid;
  const result = await db.query('SELECT * FROM favorites WHERE fid = $1', [
    fid,
  ]);
  // if (result.rowCount == 0) res.send([])
  res.send(result.rows);
});

router.get('/count/:fid', async (req, res) => {
  const fid = req.params.fid;
  const result = await db.query(
    'SELECT COUNT(*) FROM favorites WHERE fid = $1',
    [fid]
  );
  res.send(result.rows[0].count);
});

router.post('/', async (req, res) => {
  var fid = req.body.fid;
  var uid = req.body.uid;
  const exists = await db.query(
    'SELECT COUNT(*) FROM favorites WHERE fid = $1 AND uid = $2',
    [fid, uid]
  );
  if (exists.rows[0].count == 0) {
    const result = await db.query(
      'INSERT INTO favorites(fid, uid) VALUES($1, $2) RETURNING *',
      [fid, uid]
    );
    res.send(true);
  } else {
    const result = await db.query(
      'DELETE FROM favorites WHERE fid = $1 AND uid = $2',
      [fid, uid]
    );
    res.send(true);
  }
});
