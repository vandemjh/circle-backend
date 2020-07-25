const { Pool } = require('pg');
const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};

// {
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	port: process.env.DB_PORT || 5432,
// 	host: process.env.HOST || "localhost",
// 	max: process.env.MAX_CLIENTS || 10,
// 	idleTimeoutMillis: 30000,
// 	connectionTimeoutMillis: 2000,
// }
