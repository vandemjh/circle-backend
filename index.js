const express = require('express');
const router = require('express-promise-router');
const mountRoutes = require('./router');
const fs = require('fs');
const db = require('./db/access');

const APP = express();
const PORT = process.env.PORT || 3000;
mountRoutes(APP);

if (process.env.STARTUP)
  fs.readFile('./sql/init.sql', 'utf8', (err, sql) => {
    if (err) {
      return console.log(err);
    }
    db.query(sql.replace(/[\n\r]/g, '').replace(/    /g, ''));
  });

APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
