export interface Ingrediente {
	nombre: string;
	precio: number;
	seleccionado: boolean;
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
			seleccionado: true,
		},
	],
	precio: 10000,
};

const ingredientes: ListaIngredientes = [
	{
		nombre: 'pollo',
		precio: 5000,
		seleccionado: false,
	},
	{
		nombre: 'pepperoni',
		precio: 4500,
		seleccionado: false,
	},
	{
		nombre: 'jamón',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'jamón serrano',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'salami',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'queso azul',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'piña',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'champiñones',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'ciruela',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'tocineta',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'tomate',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'pimentón',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'pera',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'rúgula',
		precio: 3000,
		seleccionado: false,
	},
	{
		nombre: 'albahaca',
		precio: 3000,
		seleccionado: false,
	},
];

export const stateInicial = {
	pizza,
	ingredientes,
};

export type CreadorPizzaState = typeof stateInicial;
