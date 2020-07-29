const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.get('/:id', async (req, res) => {
    const id = req.params;
    const rows = await db.query('SELECT * FROM posts WHERE pid = $1', [id]);
    res.send(rows);
});

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM posts');
    res.send(utils.stringify(result.rows));
});

router.post('/', async (req, res) => {
  console.log(req.body)
    const result = await db.query(
        'INSERT INTO posts(post) VALUES($1::Post_type)', [req.body]
    );
    res.send(utils.stringify(result.rows));
});
