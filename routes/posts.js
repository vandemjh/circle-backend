const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const result = await db
    .query('SELECT * FROM posts WHERE pid = $1', [pid])
    .catch((err) => {
      console.log('Should create a response object here' + err);
    });
  res.send(!!result ? result.rows : []);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM posts ORDER BY created');
  res.send(result.rows);
});

router.get('/postedSince/:created', async (req, res) => {
  var created = req.params.created;
  const result = await db.query('SELECT * FROM posts WHERE created > $1', [
    created,
  ]);
  res.send(result.rows);
});

router.post('/', async (req, res) => {
  var poster = req.body.poster;
  var comments = req.body.comments;
  var likes = req.body.likes;
  const result = await db.query(
    ```
    INSERT INTO posts(poster, comments, likes) 
    VALUES($1, $2, $3)
    ```,
    [poster, comments, likes]
  );
  // throw new Error("broken")
  res.send(result.rowCount >= 1);
});
