import React from 'react';

import './home.styles.scss';

const HomePage: React.FC = () => (
	<div className='grid-container'>
		<div className='banner'>
			<h1>Bienvenido a La Pizzería Cósmica!</h1>
			<p>
				Crea tu pizza desde la comodidad de tu hogar, nosotros nos
				encargamos del resto.
			</p>
		</div>
		<div className='contenedor-central'></div>
	</div>
);

export default HomePage;
