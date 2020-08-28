import React, { useState } from 'react';

import InputFormulario from '../input-formulario/input-formulario.component';

import './crear-cuenta.styles.scss';
import axios from 'axios';

interface CrearCuentaState {
	[name: string]: string;
	nombre: string;
	email: string;
	password: string;
	confirmarPassword: string;
	telefono: string;
}

const CrearCuenta: React.FC = () => {
	const [credenciales, setCredenciales] = useState<CrearCuentaState>({
		nombre: '',
		email: '',
		password: '',
		confirmarPassword: '',
		telefono: '',
	});

	const {
		nombre,
		email,
		password,
		confirmarPassword,
		telefono,
	} = credenciales;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (password !== confirmarPassword) {
			return alert(`Las contraseñas no son iguales.`);
		}

		console.log('efecto');
		console.log({ email, password, nombre });
		axios({
			method: 'post',
			url: '/usuarios',
			data: credenciales,
		}).then(res => console.log(res));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setCredenciales({ ...credenciales, [name]: value });
	};

	console.log(credenciales);

	return (
		<div className='contenedor-crear-cuenta'>
			<h2>No tengo cuenta todavia</h2>
			<span>Crea una cuenta con tu correo y contraseña</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<InputFormulario
					type='text'
					name='nombre'
					value={nombre}
					handleChange={handleChange}
					label='Nombre'
					required
				/>
				<InputFormulario
					type='email'
					name='email'
					value={email}
					handleChange={handleChange}
					label='Email'
					required
				/>
				<InputFormulario
					type='number'
					name='telefono'
					value={telefono}
					handleChange={handleChange}
					label='Telefono'
					required
				/>
				<InputFormulario
					type='password'
					name='password'
					value={password}
					handleChange={handleChange}
					label='Contraseña'
					required
				/>
				<InputFormulario
					type='password'
					name='confirmarPassword'
					value={confirmarPassword}
					handleChange={handleChange}
					label='Confirma Contraseña'
					required
				/>
				<button className='crear-cuenta-button' type='submit'>
					Crea tu Cuenta
				</button>
			</form>
		</div>
	);
};

export default CrearCuenta;
