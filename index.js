const express = require("express");
const router = require("express-promise-router");
const mountRoutes = require("./router");

const app = express();
const port = 3000;
mountRoutes(app);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))