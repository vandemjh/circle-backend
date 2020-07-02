const { json } = require("body-parser");

module.exports = {
    stringify: (input) => "<pre><code>" + JSON.stringify(input, null, 2) + "</pre></code>"
}