const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UsuarioSchema = new mongoose.Schema({
	nombre: String,
	email: String,
	telefono: String,
	admin: Boolean,
	pedidos_id: [mongoose.Schema.Types.ObjectId],
	fecha_creacion: { type: Date, default: Date.now },
});

//P-L-M Methods
UsuarioSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	usernameQueryFields: ['email'],
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
