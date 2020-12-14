const Router = require('express-promise-router');
const db = require('../db/access');
const router = new Router();

module.exports = router;

router.get('/:minified/:iid', async (req, res) => {
  const iid = req.params.iid;
  const minified = req.params.minified === 'minified' ? 'minified' : 'image';
  const result = await db.query(
    `SELECT ${minified} FROM images WHERE iid = $1`,
    [
      iid,
    ]
  );
  if (!result || result.rows.length == 0)
    return res.status(404).send({ error: 'No such image.' });
  const image =
    minified === 'minified' ? result.rows[0].minified : result.rows[0].image;
  res.send(image);
});
