const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

const POSTS_PER_PAGE = 10;

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
  const result = await db.query(
    `SELECT * FROM posts ORDER BY created DESC LIMIT ${POSTS_PER_PAGE}`
  );
  res.send(result.rows);
});

router.get('/postedBefore/:created', async (req, res) => {
  var created = req.params.created;
  const result = await db.query(
    `SELECT * FROM posts WHERE created > $1 ORDER BY created DESC LIMIT ${POSTS_PER_PAGE}`,
    [created]
  );
  res.send(result.rows);
});

router.get('/postedAfter/:created', async (req, res) => {
  var created = req.params.created;
  const result = await db.query(
    `SELECT * FROM posts WHERE created < $1 ORDER BY created DESC LIMIT ${POSTS_PER_PAGE}`,
    [created]
  );
  res.send(result.rows);
});

router.post('/', async (req, res) => {
  var description = req.body.description;
  var location = req.body.location;
  var imageurl = req.body.imageurl;
  var uid = req.body.uid;
  const result = await db.query(
    'INSERT INTO posts(description, location, imageurl, uid) VALUES($1, $2, $3, $4) RETURNING *',
    [description, location, imageurl, uid]
  );
  // .then(db.query('INSERT INTO likes(lid)', [result.rows[0].likes]));
  res.send(result.rows);
});
