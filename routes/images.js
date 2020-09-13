const Router = require('express-promise-router');
const db = require('../db/access');
const router = new Router();
// const imageminPngquant = require('imagemin-pngquant');

module.exports = router;

router.get('/:iid', async (req, res) => {
  const iid = req.params.iid;
  const result = await db.query(
    `SELECT ${
      process.env.MINIFIED === 'true' ? 'minified' : 'image'
    } FROM images WHERE iid = $1`,
    [iid]
  );
  if (!result || result.rows.length == 0)
    return res.status(404).send({ error: 'No such image.' });
  const image = process.env.MINIFIED === 'true' ? result.rows[0].minified : result.rows[0].image;
  res.send(image);
});
