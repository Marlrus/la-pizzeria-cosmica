import { CreadorPizzaState, Ingrediente } from './pizza.types';
import { Reducer } from 'react';
import { generarNombrePizza } from '../../utils/utils';

export const ActionTypes = {
	AGREGAR_INGREDIENTE: 'AGREGAR_INGREDIENTE',
	REMOVER_INGREDIENTE: 'REMOVER_INGREDIENTE',
	ACTUALIZAR_PRECIO: 'ACTUALIZAR_PRECIO',
} as const;

export const agregarIngrediente = (nombre: string, precio: number) => ({
	type: ActionTypes.AGREGAR_INGREDIENTE,
	payload: { nombre, precio },
});

export const removerIngrediente = (nombre: string, precio: number) => ({
	type: ActionTypes.REMOVER_INGREDIENTE,
	payload: { nombre, precio },
});

export const actualizarPrecio = {
	type: ActionTypes.ACTUALIZAR_PRECIO,
};

const precioPizza = (ingredientes: Ingrediente[]) => {
	const precio = ingredientes.reduce(
		(total, ingrediente) => (total += ingrediente.precio),
		0,
	);
	console.log({ precio });
	return precio;
};
type CreadorActions =
	| ReturnType<typeof agregarIngrediente>
	| ReturnType<typeof removerIngrediente>
	| typeof actualizarPrecio;

export const creadorPizzaReducer: Reducer<CreadorPizzaState, CreadorActions> = (
	state: CreadorPizzaState,
	action: CreadorActions,
) => {
	const { ingredientes, pizza } = state;
	switch (action.type) {
		case ActionTypes.AGREGAR_INGREDIENTE: {
			const ingrediente = ingredientes.filter(
				({ nombre }) => nombre === action.payload.nombre,
			);
			const ingredientesPizza = [...pizza.ingredientes, ...ingrediente];
			return {
				...state,
				ingredientes: ingredientes.filter(
					({ nombre }) => nombre !== action.payload.nombre,
				),
				pizza: {
					...pizza,
					ingredientes: ingredientesPizza,
					precio: pizza.precio + action.payload.precio,
					nombre: generarNombrePizza(ingredientesPizza),
				},
			};
		}
		case ActionTypes.REMOVER_INGREDIENTE: {
			if (action.payload.nombre === 'masa') return state;
			const ingrediente = ingredientes.filter(
				({ nombre }) => nombre === action.payload.nombre,
			);
			const ingredientesPizza = pizza.ingredientes.filter(
				({ nombre }) => nombre !== action.payload.nombre,
			);
			return {
				...state,
				ingredientes: [...ingredientes, ...ingrediente],
				pizza: {
					...pizza,
					ingredientes: ingredientesPizza,
					precio: pizza.precio - action.payload.precio,
					nombre:
						ingredientesPizza.length > 1
							? generarNombrePizza(ingredientesPizza)
							: '',
				},
			};
		}
		case ActionTypes.ACTUALIZAR_PRECIO:
			return {
				...state,
				pizza: {
					...pizza,
					precio: precioPizza(state.pizza.ingredientes),
				},
			};
		default:
			return state;
	}
};
