import React, { useState, useContext } from 'react';

import InputFormulario from '../input-formulario/input-formulario.component';

import './crear-cuenta.styles.scss';
import axios from 'axios';
import { UsuarioDB } from '../../types/user-auth.types';
import UsuarioAuthContext from '../../contexts/user-auth/user-auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface CrearCuentaState {
	[name: string]: string;
	nombre: string;
	email: string;
	password: string;
	confirmarPassword: string;
	telefono: string;
}

interface UsuarioDBRes {
	data: UsuarioDB;
}

const CrearCuenta: React.FC<RouteComponentProps> = ({ history }) => {
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

	const usuarioContext = useContext(UsuarioAuthContext);
	// console.log(usuarioContext);
	const { setUsuario } = usuarioContext;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (password !== confirmarPassword) {
			return alert(`Las contraseñas no son iguales.`);
		}

		axios({
			method: 'post',
			url: '/usuarios',
			data: credenciales,
		})
			.then((res: UsuarioDBRes) => {
				const userData = {
					...res.data,
					autenticado: true,
					admin: res.data.admin,
				};
				setUsuario!(userData);
				localStorage.setItem('usuario-state', JSON.stringify(userData));
				history.push('/');
			})
			.catch(err => alert(err));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setCredenciales({ ...credenciales, [name]: value });
	};

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

export default withRouter(CrearCuenta);
