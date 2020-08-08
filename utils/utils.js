const db = require('../db/access');
const fs = require('fs');

module.exports = {
  stringify: (input) => JSON.stringify(input, null, 2),
  startup: () => {
    fs.readFile('./sql/init.sql', 'utf8', (err, sql) =>
      db.query(sql.replace(/[\n\r]/g, '').replace(/    /g, ''))
    );
  },
  testPosts: () => {
    db.query(`INSERT INTO users(username, sub, email, picture) VALUES('test', 'test', 'test','test') RETURNING uid`)
      .then(
        (success) => {
          console.log('User created with uid: ' + success.rows[0].uid);
          for (let i = 0; i < 100; i++)
            db.query(
              `INSERT INTO posts(description, location, uid) VALUES('${i}', '${i}', '${success.rows[0].uid}')`
            );
          console.log('Done adding posts!');
        },
        (reject) => console.log(reject)
      )
      .catch((err) => console.log(err));
  },
};
