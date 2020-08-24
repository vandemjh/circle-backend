const Router = require('express-promise-router');
const db = require('../db/access');
// const btoa = require('btoa');
const fs = require('fs');
const router = new Router();
const express = require('express');

module.exports = router;

router.use('/data', express.static('./data'));

router.get('/:iid', async (req, res) => {
  const iid = req.params.iid;
  const result = await db.query(`SELECT image FROM images WHERE iid = $1`, [
    iid,
  ]);
  //   console.log(result)
  if (!result || result.rows.length == 0)
    return res.status(404).send({ error: 'No such image.' });
  const image = result.rows[0].image;
  //   var binary = btoa(String.fromCharCode.apply(null, new Uint8Array(image)));

  //   console.log(image);
  //   fs.writeFile('img', image, 'base64', (err) => console.log(err));
  return res.send(image);
});
