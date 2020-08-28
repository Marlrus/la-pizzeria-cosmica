const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const http = require('http');
const enforce = require('express-sslify');
const mongoose = require('mongoose');
const routes = require('./routes/index.routes');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();

const app = express();

//COOKIE SESSION CONFIG
app.use(
	cookieSession({
		name: 'pizzeria-cosmica-sesion',
		keys: ['Esto iria en variables de ambiente'],
		//Cookie Option
		maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
		expires: new Date(2100, 1, 1),
	}),
);

//Body Parser Setup
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cross Origin Request
app.use(cors());

//Passport Setup
app.use(passport.initialize());
app.use(passport.session());

require('./authConfig/local-passport-setup');

if (process.env.NODE_ENV === 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
	app.use(express.static(path.join(__dirname, '../client/build')));
	//Every URL
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

//Server
const port = process.env.PORT || 5000;

http
	.createServer(app)
	.listen(port, () => console.log(`Server running on port ${port}`))
	.on('error', err => {
		throw err;
	});

//DB CONNECTION
mongoose
	.connect(
		`mongodb+srv://Marlrus:p86Oqqwiu82e8xtV@lapizzeriacosmica.nyd47.mongodb.net/LaPizzeriaCosmica?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		},
	)
	.then(() => {
		console.log(`Mongoose Connected to: ${mongoose.connection.name}`);
	})
	.catch(err => {
		console.log(`Error: ${err.message}`);
	});

//VIs

app.use('/', routes);
