const Router = require('express-promise-router');
const db = require('../db/access');
const router = new Router();
const sharp = require('sharp');

module.exports = router;

router.get('/:iid', async (req, res) => {
  const iid = req.params.iid;
  const result = await db.query(`SELECT image FROM images WHERE iid = $1`, [
    iid,
  ]);
  if (!result || result.rows.length == 0)
    return res.status(404).send({ error: 'No such image.' });
  const image = result.rows[0].image;
  if (process.env.COMPRESSION === 'true')
    // { quality: 10 }
    sharp(image)
      .jpeg()
      .toBuffer()
      .then((buffer) => {
        return res.send(buffer);
      });
  else return res.send(image);
});
