const passport = require('passport'),
	Models = require('../models'),
	User = Models.User;

//P-L REQUIRE (NOT USED AS A VARIABLE)
require('passport-local');

//Local config
passport.use(User.createStrategy());

//Serialize and Desiralize L-P-M
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
