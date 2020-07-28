const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');
const utils = require('../utils/utils');

const router = new Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
module.exports = router;

const form = `
    <form action="/debug/" method="POST">
    <textarea name="query" rows="4" cols="50"></textarea>
    <br><br><input type="submit" value="Submit"></form>`;
const button = `<form action="/debug/"
    <input type="submit" value="Back" />
    </form>`;

router.get('/', async (req, res) => {
  res.send(form);
});
router.post('/', async (req, res) => {
  // console.log(req.body);
  res.setHeader('Content-type', 'text/html');
  res.write('<h2>query: </h2>\n');
  res.write('<pre><code>' + utils.stringify(req.body.query) + '</pre></code>');
  res.write('<h2>db response:</h2>\n<pre><code>');
  await db
    .query(req.body.query)
    .then((result) => {
      res.write(
        utils.stringify(result.rows) == undefined
          ? 'Probably worked... no rows returned'
          : // utils.stringify(result)
            utils.stringify(result.rows)
      );
    })
    .catch((err) => {
      console.log('ERROR!! ' + err);
      res.write(utils.stringify(err));
    });
  res.write('</pre></code></br></br>' + button);
  res.end();
});
