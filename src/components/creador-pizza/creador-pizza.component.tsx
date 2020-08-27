import React, { useReducer } from 'react';

import './creador-pizza.styles.scss';

import { stateInicial } from './pizza.types';
import { creadorPizzaReducer } from './creador-pizza.reducer';

import {
	agregarIngrediente,
	removerIngrediente,
} from './creador-pizza.reducer';

import { capitalizarPalabras } from '../../utils/utils';

const CreadorPizza: React.FC = () => {
	const [creadorState, dispatch] = useReducer(
		creadorPizzaReducer,
		stateInicial,
	);

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
