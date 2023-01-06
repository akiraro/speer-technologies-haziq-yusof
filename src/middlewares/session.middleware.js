
module.exports = function isAuthenticated(req, res, next) {
	if (req.session.user){
		next()
	}
	else{
		res.send(401, "Unauthorized")
	}
}