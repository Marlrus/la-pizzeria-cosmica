import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../pizzeria-cosmica-logo.svg';

import './header.styles.scss';
import axios from 'axios';
import UserAuthContext from '../../contexts/user-auth/user-auth';

const Header: React.FC = () => {
	const [logout, setLogout] = useState(false);
	const usuario = useContext(UserAuthContext);
	const { admin, autenticado, setUsuario } = usuario;

	const logoutHandler = () => setLogout(true);

	useEffect(() => {
		if (logout) {
			axios({
				method: 'get',
				url: '/usuarios/logout',
				withCredentials: true,
			})
				.then(res => {
					localStorage.removeItem('usuario-state');
					setUsuario!({
						autenticado: false,
						admin: false,
					});
				})
				.catch(err => console.log(err));
		}
		setLogout(false);
	}, [logout, setUsuario]);

	return (
		<header className='header-container'>
			<nav className='header-nav'>
				<ul>
					<li>
						<Link
							to={'/'}
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<img src={logo} className='header-logo' alt='logo' />
							Crea tu Pizza
						</Link>
					</li>
					<li>
						{autenticado === true ? (
							<Link to={'/'} onClick={logoutHandler}>
								Salir de Cuenta
							</Link>
						) : (
							<Link to={'/usuarios'}>Entrar a Cuenta</Link>
						)}
					</li>
					{admin ? (
						<li>
							<Link to={'/pedidos'}>Dashboard</Link>
						</li>
					) : null}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
