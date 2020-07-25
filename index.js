const express = require('express');
const router = require('express-promise-router');
const mountRoutes = require('./router');

const APP = express();
const PORT = process.env.PORT || 3000;
mountRoutes(APP);

// console.log(process.env);

APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
