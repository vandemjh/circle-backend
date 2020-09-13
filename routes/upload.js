const Router = require('express-promise-router');
const fileUpload = require('express-fileupload');
const db = require('../db/access');
const router = new Router();
const sharp = require('sharp');

module.exports = router;
router.use(
  fileUpload({
    // 50 mb
    limits: { fileSize: 50 * 1024 * 1024 },
    debug: process.env.DEBUG === 'true' && process.env.SKIP_LOGGING !== 'true',
  })
);

router.post('/', async (req, res) => {
  try {
    if (process.env.SKIP_LOGGING !== 'true') console.log(req.files);
    var image = req.files.image;
    const type = req.files.image.mimetype.split('/')[1];
    const data = req.files.image.data;
    if (!req.files || !image || !data)
      return res.status(400).send({ error: 'No files were uploaded.' });
    if (!type) return res.status(415).send({ error: 'Mimetype error.' });
    if (image.truncated)
      return res.status(413).send({ error: 'File too large' });

    const result = await db.query(
      `INSERT INTO images(image) VALUES($1) RETURNING iid`,
      [data]
    );
    // console.log(result.rows[0])
    var ret = result.rows[0].iid; //.${type}
    res.send({ payload: ret });
    // sharp(data, { quality: 30 })
    //   .jpeg()
    //   .toBuffer()
    //   .then((buffer) => {
    //     console.log("size: " + buffer.length)
    //     console.log("reduced size is: " + buffer.length / data.length * 100 + "% smaller");
    //     // db.query(`INSERT INTO images(small) VALUES($1)`, [buffer]);
    //   });
  } catch (err) {
    console.log(err);
  }
});
