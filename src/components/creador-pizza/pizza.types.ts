export interface Ingrediente {
	nombre: string;
	precio: number;
}

type ListaIngredientes = Ingrediente[];

export interface Pizza {
	nombre: string;
	ingredientes: Ingrediente[];
	precio: number;
}

const pizza = {
	nombre: '',
	ingredientes: [
		{
			nombre: 'masa',
			precio: 10000,
		},
	],
	precio: 10000,
};

const ingredientes: ListaIngredientes = [
	{
		nombre: 'pollo',
		precio: 5000,
	},
	{
		nombre: 'pepperoni',
		precio: 4500,
	},
	{
		nombre: 'jamón',
		precio: 3000,
	},
	{
		nombre: 'jamón serrano',
		precio: 3000,
	},
	{
		nombre: 'salami',
		precio: 3000,
	},
	{
		nombre: 'queso azul',
		precio: 3000,
	},
	{
		nombre: 'piña',
		precio: 3000,
	},
	{
		nombre: 'champiñones',
		precio: 3000,
	},
	{
		nombre: 'ciruela',
		precio: 3000,
	},
	{
		nombre: 'tocineta',
		precio: 3000,
	},
	{
		nombre: 'tomate',
		precio: 3000,
	},
	{
		nombre: 'pimentón',
		precio: 3000,
	},
	{
		nombre: 'pera',
		precio: 3000,
	},
	{
		nombre: 'rúgula',
		precio: 3000,
	},
	{
		nombre: 'albahaca',
		precio: 3000,
	},
];

export const stateInicial = {
	pizza,
	ingredientes,
};

export type CreadorPizzaState = typeof stateInicial;
