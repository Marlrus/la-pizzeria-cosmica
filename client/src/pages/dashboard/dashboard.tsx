import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './dashboard.styles.scss';

interface Response {
	data: Pedido[];
}

const Dashboard: React.FC = () => {
	const [pedidos, setPedidos] = useState([] as Pedido[]);

	useEffect(() => {
		const data = axios({
			url: '/pedidos',
			method: 'get',
		}).then((res: Response) => setPedidos(res.data));
	}, []);

	return (
		<div className='grid-container'>
			<div className='contenedor-central'>
				<h1>DASHBOARD</h1>
			</div>
		</div>
	);
};

export default Dashboard;
