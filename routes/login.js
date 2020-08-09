const db = require('../db/access');
const Router = require('express-promise-router');
var bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());
module.exports = router;

router.post('/', async (req, res) => {
  var user = new Auth0User(req.body);
  if (!user || !user.sub) res.status(422).send({ error: 'no sub' });
  const existing = await db
    .query(`SELECT * FROM users WHERE sub = $1`, [user.sub])
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: 'db error' });
      return;
    });
  // User in db
  if (existing.rowCount == 1) {
    await db
      .query(`UPDATE users SET logins = logins + 1 WHERE sub = $1`, [user.sub])
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: 'login error' });
        return;
      });
    res.send(existing.rows[0]);
    return;
  }
  // User not in db
  else {
    const result = await db
      .query(
        `INSERT INTO users(username, sub, email, picture) VALUES($1, $2, $3, $4) RETURNING *`,
        [user.username, user.sub, user.email, user.picture]
      )
      .catch((err) => {
        res.status(500).send({ error: 'initial login error' });
        console.log(err);
        return;
      });
    res.send(result.rows[0]);
  }
});

class Auth0User {
  email;
  email_verified;
  name;
  nickname;
  picture;
  sub;
  // 'auth0|5f2aea68dc682600a0b68ef9';
  updated_at;
  // Additional params on social login
  username;
  constructor(obj) {
    Object.assign(this, obj);
    if (this.username == undefined) this.username = this.nickname;
    return this;
  }
}
