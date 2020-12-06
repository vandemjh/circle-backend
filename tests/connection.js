require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool();


try {
	pool.query("CALL NOW()");
} catch(err) {
	console.log(err);
	return false;
}
return true;
