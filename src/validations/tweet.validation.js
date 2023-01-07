const { body } = require("express-validator");

const tweetDataValidate = [
	body("text")
		.exists({ checkFalsy: true })
		.withMessage("Text is required")
		.isString()
		.isLength({ min: 1, max: 160 })
		.withMessage("Text should be between 1 to 160 characters"),

];

module.exports = {
	tweetDataValidate
}