import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './dashboard.styles.scss';
import TablaDetalles from '../../components/tabla-detalles/tabla-detalles';
import { formatearPedidos, filter, pipe } from '../../utils/utils';

interface Response {
	data: Pedido[];
}

const Dashboard: React.FC = () => {
	const [pedidosState, setPedidos] = useState([] as Pedido[]);
	const [cliente, setCliente] = useState('');
	const [precioMin, setPrecioMin] = useState(0);
	const [precioMax, setPrecioMax] = useState(10000000000000);

	useEffect(() => {
		axios({
			url: '/pedidos',
			method: 'get',
			withCredentials: true,
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

	const filtrarPorNombre = (pedido: Pedido) =>
		pedido.nombre_cliente.toLowerCase().includes(cliente.toLowerCase());
	const filtrarPorMin = (pedido: Pedido) => pedido.precio > precioMin;
	const filtrarPorMax = (pedido: Pedido) => pedido.precio < precioMax;

	const filtroCompleto = pipe<Pedido[], Pedido[]>(
		filter(filtrarPorNombre),
		filter(filtrarPorMin),
		filter(filtrarPorMax),
	);

	const pedidos = filtroCompleto(pedidosState);

	return (
		<div>
			<div className='contenedor-pedidos'>
				<h1>Historico de Pedidos</h1>
				<h3>Filtros</h3>
				<div className='contenedor-filtro'>
					<div>
						<label>Cliente</label>
						<input
							type='text'
							onChange={e => setCliente(e.target.value)}
						/>
					</div>
					<div>
						<label>Precio Minimo</label>
						<input
							type='number'
							onChange={e => setPrecioMin(+e.target.value)}
						/>
					</div>
					<div>
						<label>Precio Maximo</label>
						<input
							type='number'
							onChange={e => setPrecioMax(+e.target.value)}
						/>
					</div>
				</div>
				<div className='total-ventas'>
					<table>
						<tbody>
							<tr>
								<td>
									<strong>Total En Ventas Filtradas: </strong>$
									{pedidos
										.reduce(
											(total, pedido) => (total += pedido.precio),
											0,
										)
										.toLocaleString()}
								</td>
								<td>
									<strong>Numero de Ventas: </strong>
									{pedidos.length}
								</td>
							</tr>
						</tbody>
					</table>
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
