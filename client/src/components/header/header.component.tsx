import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../pizzeria-cosmica-logo.svg';

import './header.styles.scss';

const Header: React.FC = () => (
	<header className='header-container'>
		<nav className='header-nav'>
			<ul>
				<li>
					<Link to={'/'} style={{ display: 'flex', alignItems: 'center' }}>
						<img src={logo} className='header-logo' alt='logo' />
						Crea tu Pizza
					</Link>
				</li>
				<li>
					<Link to={'/pedidos'}>Dashboard</Link>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
