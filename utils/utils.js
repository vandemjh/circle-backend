const db = require('../db/access');
const fs = require('fs');

module.exports = {
  stringify: (input) => JSON.stringify(input, null, 2),
  startup: async () => {
    return new Promise((res, rej) => {
      fs.readFile('./sql/init.sql', 'utf8', (err, sql) =>
        db
          .query(sql.replace(/[\n\r]/g, '').replace(/    /g, ''))
          .then(() => console.log('Tables created'))
          .then(res())
          .catch((err) => rej(err))
      );
    });
  },
  wait: async (ms) => new Promise((res, rej) => setTimeout(() => res(), ms || 1000)),
  dropTables: async () => {
    return db
      .query(
        `DROP TABLE IF EXISTS posts CASCADE;
    DROP TABLE IF EXISTS comments CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS favorites CASCADE;
    DROP TABLE IF EXISTS images CASCADE;`
      )
      .then(() => console.log('Tables dropped'));
  },
  testPosts: async () => {
    var promises = [];
    // promises.push(await db
    //   .query(`INSERT INTO users(username) VALUES('test') RETURNING uid`)
    //   .then((success) => console.log('User created with uid: ' + success.rows[0].uid))
    //   .catch((err) => console.log(err)));
    for (let i = 0; i < 100; i++)
      promises.push(
        await db
          .query(
            `INSERT INTO posts(description, location, uid) VALUES('${i}', '${i}', '${'00000000-0000-0000-0000-000000000000'}')`
          )
          .catch((err) => console.log(err))
      );
    return Promise.all(promises).then(() => console.log('Test posts added'));
  },
};
