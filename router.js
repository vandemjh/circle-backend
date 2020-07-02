const users = require("./routes/users.js");
const debug = require("./routes/debug.js")

module.exports = (app) => {
    app.use("/hello-world", (req, res) => res.send("hello world!")),
    app.use("/users", users)
    app.use("/debug", debug)
}