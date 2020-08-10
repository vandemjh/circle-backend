const Router = require('express-promise-router');
const router = new Router();

const express = require('express');

router.use('/', express.static('./data'));
module.exports = router;
