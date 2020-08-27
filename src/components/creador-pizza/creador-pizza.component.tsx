import React, { useReducer, useEffect } from 'react';

import './creador-pizza.styles.scss';

import { stateInicial, CreadorPizzaState } from './pizza.types';
import { creadorPizzaReducer } from './creador-pizza.reducer';

import {
	agregarIngrediente,
	removerIngrediente,
	recuperarPizza,
} from './creador-pizza.reducer';

import { capitalizarPalabras } from '../../utils/utils';

const CreadorPizza: React.FC = () => {
	const [creadorState, dispatch] = useReducer(
		creadorPizzaReducer,
		stateInicial,
	);

	useEffect(() => {
		const creadorState: string | null = localStorage.getItem('pizzaState');
		if (!creadorState) return;
		dispatch(recuperarPizza(JSON.parse(creadorState) as CreadorPizzaState));
	}, []);

	useEffect(() => {
		localStorage.setItem('pizzaState', JSON.stringify(creadorState));
	}, [creadorState]);

	const { ingredientes, pizza } = creadorState;

	return (
		<div className='contenedor-creacion-pizza'>
			<h2>Crea tu Pizza</h2>
			<h3>{pizza.nombre}</h3>
			<div className='listas-creacion'>
				<ul>
					<h3>Ingredientes</h3>
					{ingredientes.map(({ nombre, precio }) => (
						<li
							key={nombre}
							onClick={() =>
								dispatch(agregarIngrediente(nombre, precio))
							}
						>
							{capitalizarPalabras(nombre)} ${precio.toLocaleString()}
						</li>
					))}
				</ul>
				<ul>
					<h3>Pizza: ${pizza.precio.toLocaleString()}</h3>
					{pizza.ingredientes.map(({ nombre, precio }) => (
						<li
							key={nombre}
							onClick={() =>
								dispatch(removerIngrediente(nombre, precio))
							}
						>
							{capitalizarPalabras(nombre)} ${precio.toLocaleString()}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CreadorPizza;
