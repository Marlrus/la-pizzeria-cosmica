import React from 'react';

import './home.styles.scss';
import CreadorPizza from '../../components/creador-pizza/creador-pizza.component';

const HomePage: React.FC = () => (
	<>
		<div className='banner'>
			<h1>Bienvenido a La Pizzería Cósmica!</h1>
			<p>
				Crea tu pizza desde la comodidad de tu hogar, nosotros nos
				encargamos del resto.
			</p>
		</div>
		<div className='grid-container'>
			<div className='contenedor-central'>
				<CreadorPizza />
			</div>
		</div>
	</>
);

export default HomePage;
