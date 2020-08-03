require('dotenv').config();
const express = require('express');
const router = require('express-promise-router');
const mountRoutes = require('./router');
const fs = require('fs');
const db = require('./db/access');
// const authMiddleware = require('./auth/auth');
// const authSession = require('./auth/session');

const APP = express();
// APP.use(authMiddleware);
// APP.use(authSession);
const PORT = process.env.PORT || 3000;
mountRoutes(APP);

if (process.env.STARTUP === 'true')
  fs.readFile('./sql/init.sql', 'utf8', (err, sql) => {
    if (err) {
      return console.log(err);
    }
    db.query(sql.replace(/[\n\r]/g, '').replace(/    /g, '')).then(() => {
      if (process.env.TEST_POSTS === 'true') {
        // const sleep = (fn, m) => new Promise(() => setTimeout(fn, m));
        db.query(`INSERT INTO users(username) VALUES('${'asdf'}') RETURNING uid`)
          .then(
            (success) => {
              console.log('User created with uid: ' + success.rows[0].uid);
              for (let i = 0; i < 100; i++) {
                // setTimeout(() => {
                db.query(
                  `INSERT INTO posts(description, location, uid) VALUES('${i}', '${i}', '${success.rows[0].uid}')`
                );
                // }, 100)
                // .then(() => console.log('Post added!'));
              }
              console.log('Done adding posts!');
            },
            (reject) => console.log(reject)
          )
          .catch((err) => console.log(err));
      }
    });
  });



APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
