const db = require('../db/access');
const Router = require('express-promise-router');
const utils = require('../utils/utils')

const router = new Router();
module.exports = router;

router.get("/:id", async(req,res) => {
    const id = req.params;
    const rows = await db.query("SELECT * FROM posts WHERE uid = $1", [id])
    res.send(rows);
})

router.get("/", async(req,res) => {
    const result = await db.query("SELECT * FROM posts");
    res.send(utils.stringify(result.rows))
})

router.post("/", async(req,res) => {
    console.log(req.body);
    console.log(res.body);

    res.end(`{"post": "successful"}`);
})
