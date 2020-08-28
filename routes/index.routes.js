const router = require('express').Router({ mergeParams: true });
const Pedido = require('../models/pedido/pedido');
const Usuario = require('../models/usuario/usuario');
const passport = require('passport');
const middleware = require('../middleware/middleware');
//   passport    = require('passport'),
//   middleware  = require('../../../middleware'),
//   Models      = require('../../../models'),

router.get('/service-worker.js', (req, res) => {
	res.send(path.resolve(__dirname, '../client/build', 'serviceWorker.js'));
});

router.get('/pedidos', middleware.authCheck, async (req, res) => {
	try {
		const pedidos = await Pedido.find({});
		if (!pedidos) throw err;
		res.send(pedidos);
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

router.get('/pedidos/:_id', async (req, res) => {
	try {
		const pedido = await Pedido.findById(req.params._id);
		if (!pedido) throw err;
		res.send(pedido);
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

router.post('/pedidos', middleware.authCheck, async (req, res) => {
	try {
		// console.log('req.user._id');
		// console.log(req.user._id);
		await Pedido.create(req.body);
		res.send({ message: 'Pedido Creado!' });
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

//USUARIO
router.post('/usuarios', async (req, res) => {
	try {
		const usuarioNuevo = new Usuario(req.body);
		const usuarioRegistrado = await Usuario.register(
			usuarioNuevo,
			req.body.password,
		);
		passport.authenticate('local');
		const {
			_id,
			nombre,
			email,
			telefono,
			pedidos_id,
			admin,
		} = usuarioRegistrado;
		res.send({
			_id,
			nombre,
			email,
			telefono,
			pedidos_id,
			admin,
		});
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

router.post('/usuarios/login', passport.authenticate('local'), (req, res) => {
	try {
		const { _id, nombre, email, telefono, pedidos_id, admin } = req.user;
		res.send({
			_id,
			nombre,
			email,
			telefono,
			pedidos_id,
			admin,
		});
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

router.get('/usuarios/logout', middleware.authCheck, (req, res) => {
	try {
		req.logout();
		res.send('/');
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

module.exports = router;
