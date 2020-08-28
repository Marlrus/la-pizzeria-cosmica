import React from 'react';

import IngresarCuenta from '../../components/ingresar-cuenta/ingresar-cuenta.component';
import CrearCuenta from '../../components/crear-cuenta/crear-cuenta.component';

import './usuario-auth.styles.scss';

const UsuarioAuth: React.FC = () => {
	return (
		<div className='contenedor-auth'>
			<IngresarCuenta />
			<CrearCuenta />
		</div>
	);
};

export default UsuarioAuth;
