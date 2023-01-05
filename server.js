var express = require('express'),
	app = express();
	bodyParser = require("body-parser");
	cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text());

app.get('/', limiter, (req, res) => {
	res.json({'message': 'ok'});
})

// Check if in test mode to avoid multiple servers running at the same port during testing
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, function () {
		console.log('Social Media App is listening on port', PORT);
	});
}

module.exports = app