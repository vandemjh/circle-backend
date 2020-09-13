const Router = require('express-promise-router');
const db = require('../db/access');
const router = new Router();
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

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
    imagemin
      .buffer(image, {
        plugins: [imageminPngquant()],
      })
      .then((buffer) => {
        return res.send(buffer);
      });
  // Sharp does not work on raspi running Docker
  // { quality: 10 }
  // sharp(image)
  //   .jpeg()
  //   .toBuffer()
  //   .then((buffer) => {
  //     return res.send(buffer);
  //   });
  else return res.send(image);
});
