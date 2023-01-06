const db = require('./db.service')

async function createUser(userData){
	const result = await db.query(
		'INSERT INTO user (username, password) VALUES (?, ?)',
		[userData.username, userData.hashedPassword]
	)

	let message = 'Error in user registration'

	if (result.affectedRows){
		message = "User registered successfully"
	}

	return {message}
}

async function findUser(username){
	const result = await db.query(
		'SELECT * FROM user WHERE username = ?',
		[username]
	)

	return result
}


module.exports = {
	createUser,
	findUser
}