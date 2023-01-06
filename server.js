var express = require('express'),
	app = express();
	bodyParser = require("body-parser");
	cors = require('cors')
	session = require('express-session')

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const authRouter = require('./src/routes/auth.route')

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }))

/** Enable session */
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
	secret: 'secret',
	resave: false,
	saveUnitialized: false,
	cookie: { maxAge: oneDay }
}))

app.get('/', limiter, (req, res) => {
	res.json({'message': 'ok'});
})

/** All routes */
app.use('/user', authRouter);

// Check if in test mode to avoid multiple servers running at the same port during testing
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, function () {
		console.log('Social Media App is listening on port', PORT);
	});
}

module.exports = app