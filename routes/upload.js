const Router = require('express-promise-router');
const fileUpload = require('express-fileupload');
const { v4: uuid } = require('uuid');
const router = new Router();

module.exports = router;
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    debug: process.env.DEBUG,
  })
);

router.post('/', function (req, res) {
  try {
    console.log(req.files)
    var image = req.files.image;
    const type = req.files.image.mimetype.split("/")[1];
    if (!req.files || !image)
      return res.status(400).send({ error: 'No files were uploaded.' });

    if (image.truncated)
      return res.status(413).send({ error: 'File too large' });
    var link = `uploads/${uuid()}.${type}`;
    image.mv(`./${link}`, (err) => {
      if (err) return res.status(500).send({ error: 'Error uploading file' });
    });
    res.send({payload: link});
  } catch (err) {
    console.log(err);
  }
});
