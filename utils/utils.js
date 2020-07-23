const { json } = require("body-parser");

module.exports = {
    stringify: (input) => JSON.stringify(input, null, 2)
}