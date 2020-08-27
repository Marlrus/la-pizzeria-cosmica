import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './dashboard.styles.scss';
import TablaDetalles from '../../components/tabla-detalles/tabla-detalles';
import { formatearPedidos } from '../../utils/utils';

interface Response {
	data: Pedido[];
}

const Dashboard: React.FC = () => {
	const [pedidos, setPedidos] = useState([] as Pedido[]);

	useEffect(() => {
		axios({
			url: '/pedidos',
			method: 'get',
		}).then((res: Response) => setPedidos(res.data));
	}, []);

	const cabezeras = ['Cliente', 'Fecha', 'Pizza', 'Precio', 'Telefono'];
	const orden = [
		'nombre_cliente',
		'fecha',
		'nombre_pizza',
		'precio',
		'telefono',
	];

	// const formatearPedidos = (pedidos: Pedido[]) => {
	// 	return pedidos.map(pedido => ({
	// 		...pedido,
	// 		fecha: new Date(pedido.fecha).toLocaleDateString('es-CO'),
	// 		precio: `$${pedido.precio.toLocaleString()}`,
	// 	}));
	// };

	return (
		<div>
			<div className='contenedor-pedidos'>
				<h1>Historico de Pedidos</h1>
				<div className='total-ventas'>
					<strong>Total En Ventas Filtradas: </strong>$
					{pedidos
						.reduce((total, pedido) => (total += pedido.precio), 0)
						.toLocaleString()}
				</div>
				<TablaDetalles
					pedidos={formatearPedidos(pedidos)}
					cabezeras={cabezeras}
					orden={orden}
				/>
			</div>
			{/* <div className='contenedor-der'>
				<h1>Sidebar</h1>
			</div> */}
		</div>
	);
};

export default Dashboard;
