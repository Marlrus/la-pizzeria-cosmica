const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
	nombre_cliente: String,
	telefono: Number,
	nombre_pizza: String,
	precio: Number,
	fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pedido', PedidoSchema);
