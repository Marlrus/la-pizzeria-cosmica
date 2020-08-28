import { Pedido } from '../types/pedido.types';

export const capitalizarPalabras = (words: string) =>
	words
		.split(' ')
		.map(palabra => `${palabra[0].toUpperCase()}${palabra.slice(1)} `);

export const generarNombrePizza = (
	ingredientes: { nombre: string; precio: number }[],
) => {
	const nombrePizza = ingredientes
		.slice(1)
		.reduce(
			(nombrePizza, ingrediente) =>
				nombrePizza + ingrediente.nombre.slice(0, 2),
			'',
		);
	return `${nombrePizza[0].toUpperCase()}${nombrePizza.slice(1)}`;
};

const formatearIngredientes = (pedido: Pedido) =>
	pedido.ingredientes.map(ingrediente => ({
		...ingrediente,
		precio: `$${ingrediente.precio.toLocaleString()}`,
	}));

export const formatearPedido = (pedido: Pedido) => ({
	...pedido,
	fecha: new Date(pedido.fecha).toLocaleDateString('es-CO'),
	precio: `$${pedido.precio.toLocaleString()}`,
	ingredientes: formatearIngredientes(pedido),
});

export const formatearPedidos = (pedidos: Pedido[]) => {
	return pedidos.map(formatearPedido);
};

export const pipe = <In, Out>(...fns: Function[]) => (x: In): Out => {
	const [head, ...tail] = fns;
	const res = head(x);

	return tail.length > 0 ? pipe(...tail)(res) : res;
};

type FilterCBFn<T> = (value: T, index: number, array: T[]) => boolean;

export const filter = <T>(fn: FilterCBFn<T>) => (x: T[]) => x.filter(fn);

export const logger = <T>(x: T) => {
	console.log(x);
	return x;
};
