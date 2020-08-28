const middleware = {};

middleware.authCheck = (req, res, next) => {
	// console.log('In middleware');
	// console.log(req.user);
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.send('/usuarios');
	}
};

module.exports = middleware;
