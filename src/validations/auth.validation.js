const { body } = require("express-validator");

const userDataValidate = [
	body("username")
		.exists({ checkFalsy: true })
		.withMessage("Username is required")
		.isString()
		.isLength({ min: 5, max: 12 })
		.withMessage("Username should be between 5 to 12 characters"),
	body("password")
		.exists({ checkFalsy: true})
		.withMessage("Password is required")
		.isString()
		.isLength({ min: 6, max: 20})
		.withMessage("Password should be between 6 to 20 characters")
];

module.exports = {
	userDataValidate
}