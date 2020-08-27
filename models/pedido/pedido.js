const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
	nombre_cliente: String,
	telefono: Number,
	nombre_pizza: String,
	precio: Number,
	fecha: { type: Date, default: Date.now },
	ingredientes: [
		{
			nombre: String,
			precio: Number,
			_id: false,
		},
	],
});

module.exports = mongoose.model('Pedido', PedidoSchema);
