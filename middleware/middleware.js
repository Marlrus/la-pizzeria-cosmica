const middleware = {};

middleware.authCheck = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.send('Usuario No Autenticado.');
	}
};

module.exports = middleware;
