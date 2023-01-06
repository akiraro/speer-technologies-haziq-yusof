const bcrypt = require('bcrypt');
const authService = require('../services/auth.service')
const { validationResult } = require('express-validator')

async function register(req, res, next) {
	try {
		/** Request payload validation */
		const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()){
			return res.status(400).json({errors: validationErrors.array()})
		}

		/** Check if username is already exists */
		const users = await authService.findUser(req.body.username)

		if (users.length != 0){
			return res.status(400).json({error: "Username is already exists"})
		}

		/** Hash password with Bcrypt */
		const hashedPassword = bcrypt.hashSync(req.body.password, 10)

		let userData = req.body
		userData['hashedPassword'] = hashedPassword
		res.json(await authService.createUser(userData))
	}
	catch (err) {
		console.error("Error when registering user", err.message);
		next(err)
	}
}

async function login(req, res, next) {
	try {
		/** Request payload validation */
		const validationErrors = validationResult(req)

		if (!validationErrors.isEmpty()){
			return res.status(400).json({errors: validationErrors.array()})
		}

		const users = await authService.findUser(req.body.username)

		if (users.length === 0 || !bcrypt.compareSync(req.body.password, users[0].password)){
			return res.status(400).json({error: "Incorrect username or password"})
		}

		req.session.user = users[0]
		res.send('Logged in successfully')
	}
	catch (err) {
		console.error("Error when logging in user", err.message);
		next(err)
	}
}

async function logout(req, res, next) {
	try {
		req.session.destroy(function(error){
			/* istanbul ignore if */
			if(error) throw error
			res.send("Logged out successfully")
		})
	}
	catch (err) /* istanbul ignore next */ {
		console.error("Error when logging out user", err.message);
		next(err)
	}
}

module.exports = {
	register,
	login,
	logout
}