const router = require('express').Router({ mergeParams: true });
const Pedido = require('../models/pedido/pedido');
//   passport    = require('passport'),
//   middleware  = require('../../../middleware'),
//   Models      = require('../../../models'),
//   User        = Models.User,
//   Pago        = Models.Pago,
//   Plan        = Models.Plan,
//   Edit        = Models.Edit

router.get('/service-worker.js', (req, res) => {
	res.send(path.resolve(__dirname, '../client/build', 'serviceWorker.js'));
});

router.get('/pedidos', async (req, res) => {
	const pedidos = await Pedido.find({});
	res.send(pedidos);
});

router.get('/pedidos/:_id', async (req, res) => {
	try {
		console.log('pedidos show');
		const pedido = await Pedido.findById(req.params._id);
		if (!pedido) throw err;
		res.send(pedido);
	} catch (err) {
		res.send(err.message);
	}
});

router.post('/pedidos', async (req, res) => {
	await Pedido.create(req.body);
	res.send({ message: 'Pedido Creado!' });
});

module.exports = router;
