require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool();

pool.query("SELECT NOW();").then((resp) => {
	console.log("Success " + resp.rows[0]);
	return true;
}).catch((err) => {		
	console.log(err);
});
return false;
