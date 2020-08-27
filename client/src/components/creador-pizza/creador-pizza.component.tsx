import React, { useReducer, useEffect, FormEvent, useState } from 'react';
import axios from 'axios';

import './creador-pizza.styles.scss';

import { stateInicial, CreadorPizzaState } from './pizza.types';
import { creadorPizzaReducer, limpiarPedido } from './creador-pizza.reducer';

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

	const [submit, setSubmit] = useState(false);
	const [nombre, setNombre] = useState('');
	const [telefono, setTelefono] = useState('');
	const [pedidoEnviado, setPedidoEnviado] = useState('');

	useEffect(() => {
		const creadorState: string | null = localStorage.getItem('pizzaState');
		if (!creadorState) return;
		dispatch(recuperarPizza(JSON.parse(creadorState) as CreadorPizzaState));
	}, []);

	useEffect(() => {
		localStorage.setItem('pizzaState', JSON.stringify(creadorState));
	}, [creadorState]);

	const crearPedido = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmit(true);
	};

	const { ingredientes, pizza } = creadorState;

	useEffect(() => {
		if (submit) {
			if (telefono.length !== 7 && telefono.length !== 10) {
				setSubmit(false);
				return alert('Porfavor ingresa un telefono valido');
			}
			if (pizza.ingredientes.length === 1) {
				setSubmit(false);
				return alert('Porfavor agregar ingredientes.');
			}
			const body = {
				nombre_cliente: nombre,
				telefono,
				nombre_pizza: pizza.nombre,
				precio: pizza.precio,
			};
			console.log({ body });
			axios({
				url: '/pedidos',
				method: 'post',
				data: body,
			})
				.then((res: { data: { message: string } }) => {
					console.log(res);
					alert(res.data.message);
					setSubmit(false);
					setNombre('');
					setTelefono('');
					setPedidoEnviado('Pedido Creado!');
					dispatch(limpiarPedido);
				})
				.catch(err => {
					console.log('Payment error: ', err);
					alert('Ocurrio un problema procesando tu pedido.');
				});
		}
	}, [submit, nombre, telefono, pizza]);

	return (
		<div className='contenedor-creacion-pizza'>
			<h2>Crea tu Pizza</h2>
			<div className='listas-creacion'>
				<ul className='seleccionar-ingredientes'>
					<h3>Ingredientes</h3>
					{ingredientes.map(({ nombre, precio, seleccionado }) => (
						<li
							className={`${seleccionado ? 'seleccionado' : ''}`}
							key={nombre}
							onClick={() =>
								seleccionado
									? dispatch(removerIngrediente(nombre, precio))
									: dispatch(agregarIngrediente(nombre, precio))
							}
						>
							{capitalizarPalabras(nombre)} ${precio.toLocaleString()}
						</li>
					))}
				</ul>
				<ul>
					<h3>Pizza: ${pizza.precio.toLocaleString()}</h3>
					{pizza.ingredientes.map(({ nombre, precio }) => (
						<li key={nombre}>
							{capitalizarPalabras(nombre)} ${precio.toLocaleString()}
							{nombre !== 'masa' ? (
								<button
									onClick={() =>
										dispatch(removerIngrediente(nombre, precio))
									}
								>
									X
								</button>
							) : null}
						</li>
					))}
				</ul>
			</div>
			<div className='resumen-de-pedido'>
				<h2>Resumen de tu Pedido</h2>
				<hr />
				<div className='resumen-total'>
					<div>
						<strong>Nombre de tu Pizza:</strong>
						{` ${pizza.nombre || 'Pizza del Pasado'}`}
					</div>
					<div>
						<strong>Total a Pagar:</strong> $
						{pizza.precio.toLocaleString()}
					</div>
				</div>
				<form onSubmit={crearPedido}>
					<h3>Completa tu Pedido</h3>
					<hr />
					<div className='contenedor-inputs'>
						<div className='input'>
							<label htmlFor=''>Nombre</label>
							<br />
							<input
								value={nombre}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setNombre(e.target.value.replace(/[^A-Za-z ]/gi, ''))
								}
								type='text'
								required
							/>
						</div>
						<div className='input'>
							<label htmlFor=''>Telefono</label>
							<br />
							<input
								value={telefono.toString()}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>,
								) => setTelefono(event.target.value)}
								type='number'
								required
								maxLength={10}
							/>
							<p
								style={{
									color: `${
										telefono.length === 10 || telefono.length === 7
											? 'green'
											: 'red'
									}`,
								}}
							>{`${
								telefono.length === 7
									? 'Telefono Fijo Valido'
									: telefono.length === 10
									? 'Telefono Celular Valido'
									: telefono.length === 0
									? ''
									: 'Numero de Telefono Invalido'
							}`}</p>
						</div>
					</div>
					<br />
					<button>Crear Pedido</button>
					<p>{pedidoEnviado}</p>
				</form>
			</div>
		</div>
	);
};

export default CreadorPizza;
