export interface Pedido {
	fecha: string;
	nombre_cliente: string;
	nombre_pizza: string;
	precio: number;
	telefono: number;
	_id: string;
	ingredientes: [
		{
			nombre: string;
			precio: number;
		},
	];
}
