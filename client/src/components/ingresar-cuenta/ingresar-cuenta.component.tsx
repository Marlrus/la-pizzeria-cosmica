import React, { useState } from 'react';

import InputFormulario from '../input-formulario/input-formulario.component';

import './ingresar-cuenta.styles.scss';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Credenciales {
	[key: string]: string;
}

const CrearCuenta: React.FC<RouteComponentProps> = ({ history }) => {
	const [credenciales, setCredenciales] = useState<Credenciales>({
		email: '',
		password: '',
	});

	const { email, password } = credenciales;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCredenciales({ ...credenciales, [name]: value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		axios({
			method: 'post',
			url: '/usuarios/login',
			data: credenciales,
		})
			.then(res => {
				console.log(res);
				localStorage.setItem('user-session', JSON.stringify(res.data));
				history.push('/');
			})
			.catch(err => alert(err));
	};

	return (
		<div className='contenedor-ingresar-cuenta'>
			<h2>Ya tienes una cuenta?</h2>
			<span>Conectate con tu correo y contraseña</span>
			<form onSubmit={handleSubmit}>
				<InputFormulario
					name='email'
					type='email'
					label='Email'
					value={email}
					handleChange={handleChange}
					required
				/>
				<InputFormulario
					name='password'
					type='password'
					label='Contraseña'
					value={password}
					handleChange={handleChange}
					required
				/>
				<button type='submit'>Ingresar a tu Cuenta</button>
			</form>
		</div>
	);
};

export default withRouter(CrearCuenta);
