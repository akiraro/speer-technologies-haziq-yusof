
/* istanbul ignore file */
require('dotenv').config()

const env = process.env;

const db = {
	host: env.MYSQL_DB_HOST || 'localhost',
	user: env.MYSQL_DB_USER || 'root',
	password: env.MYSQL_DB_PASSWORD || '',
	database: env.MYSQL_DB_NAME || 'my_db',
	port: env.MYSQL_DB_PORT || 3306
}

module.exports = db