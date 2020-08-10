const Router = require('express-promise-router');
const fileUpload = require('express-fileupload');
const uuid = require('uuid');
const router = new Router();

module.exports = router;
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

router.post('/upload', function (req, res) {
  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  if (req.file.foo.truncated) return res.status(413).send('File too large');

  req.file.file.mv(`./data/${uuid()}`, (err) => {
    if (err) return res.status(500).send('Error uploading file');
    res.send('File uploaded!');
  });
});
