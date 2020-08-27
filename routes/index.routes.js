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

router.post('/pedidos', async (req, res) => {
	console.log(req.body);
	const pedido = await Pedido.create(req.body);
	console.log(pedido);
	res.send({ message: 'Pedido Creado!' });
});

module.exports = router;
