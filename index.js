const express = require('express');
const router = require('express-promise-router');
const mountRoutes = require('./router');
const fs = require('fs');
const db = require('./db/access');
const utils = require('./utils/utils')

const APP = express();
const PORT = process.env.PORT || 3000;
mountRoutes(APP);


fs.readFile('./sql/init.sql', 'utf8', (err, sql) => {
    if (err) {
        return console.log(err);
    }
    // console.log(sql.replace(/[\n\r]/g,"").replace(/    /g, ""))
    db.query(sql.replace(/[\n\r]/g,"").replace(/    /g, "")).then(res => {
        console.log(utils.stringify(res))
    })
});

// console.log(process.env);

APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
