const router = require('express').Router({ mergeParams: true });
const Pedido = require('../models/pedido/pedido');
//   passport    = require('passport'),
//   middleware  = require('../../../middleware'),
//   Models      = require('../../../models'),

router.get('/service-worker.js', (req, res) => {
	res.send(path.resolve(__dirname, '../client/build', 'serviceWorker.js'));
});

router.get('/pedidos', async (req, res) => {
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

router.post('/pedidos', async (req, res) => {
	try {
		await Pedido.create(req.body);
		res.send({ message: 'Pedido Creado!' });
	} catch (err) {
		res.status(400);
		res.send(err.message);
	}
});

module.exports = router;
