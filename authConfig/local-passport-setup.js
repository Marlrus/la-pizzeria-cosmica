const passport = require('passport');
const Usuario = require('../models/usuario/usuario');

//P-L REQUIRE (NOT USED AS A VARIABLE)
require('passport-local');

//Local config
passport.use(Usuario.createStrategy());

//Serialize and Desiralize L-P-M
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());
