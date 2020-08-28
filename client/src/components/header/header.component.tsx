import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../pizzeria-cosmica-logo.svg';

import './header.styles.scss';
import axios from 'axios';
import UserAuthContext from '../../contexts/user-auth/user-auth';

const Header: React.FC = () => {
	const [logout, setLogout] = useState(false);
	const { admin, autenticado } = useContext(UserAuthContext);
	console.log(admin, autenticado);

	const logoutHandler = () => setLogout(true);

	useEffect(() => {
		console.log(logout);
		if (logout) {
			axios({
				method: 'get',
				url: '/usuarios/logout',
				withCredentials: true,
			})
				.then(res => localStorage.removeItem('user-session'))
				.catch(err => console.log(err));
		}
		setLogout(false);
	}, [logout]);

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
						<Link to={'/usuarios'}>Entrar a Cuenta</Link>
					</li>
					<li>
						{autenticado ? (
							<Link to={'/'} onClick={logoutHandler}>
								Salir de Cuenta
							</Link>
						) : null}
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
