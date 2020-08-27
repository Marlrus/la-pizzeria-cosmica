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
