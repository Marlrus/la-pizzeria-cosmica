import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './dashboard.styles.scss';
import TablaDetalles from '../../components/tabla-detalles/tabla-detalles';
import {
	formatearPedidos,
	filter,
	pipe,
	parseFechaString,
	crearFecha,
} from '../../utils/utils';

interface Response {
	data: Pedido[];
}

const Dashboard: React.FC = () => {
	const [pedidosState, setPedidos] = useState([] as Pedido[]);
	const [cliente, setCliente] = useState<null | string>(null);
	const [precioMin, setPrecioMin] = useState<null | number>(null);
	const [precioMax, setPrecioMax] = useState<null | number>(null);
	const [fechaInicial, setFechaInicial] = useState<null | string>(null);
	const [fechaFinal, setFechaFinal] = useState<null | string>(null);

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

	const porNombre = (pedido: Pedido) =>
		pedido.nombre_cliente
			.toLowerCase()
			.includes(cliente ? cliente.toLowerCase() : '');
	const porPrecioMin = (pedido: Pedido) => pedido.precio > (precioMin ?? 0);
	const porPrecioMax = (pedido: Pedido) =>
		pedido.precio < (precioMax ?? 10000000000000);
	const porFechaMin = (pedido: Pedido) =>
		crearFecha(parseFechaString(pedido.fecha)) >=
		crearFecha(fechaInicial ?? '1900-01-01');
	const porFechaMax = (pedido: Pedido) =>
		crearFecha(parseFechaString(pedido.fecha)) <=
		crearFecha(fechaFinal ?? '9999-01-01');
	const filtroCompleto = pipe<Pedido[], Pedido[]>(
		filter(porNombre),
		filter(porPrecioMin),
		filter(porPrecioMax),
		filter(porFechaMin),
		filter(porFechaMax),
	);

	const pedidos = filtroCompleto(pedidosState);

	const resetearFiltro = () => {
		setCliente(null);
		setPrecioMin(null);
		setPrecioMax(null);
		setFechaInicial(null);
		setFechaFinal(null);
	};

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
							value={cliente ?? ''}
							onChange={e => setCliente(e.target.value)}
						/>
					</div>
					<div>
						<label>Precio Minimo</label>
						<input
							type='number'
							value={precioMin ?? ''}
							onChange={e => setPrecioMin(+e.target.value)}
						/>
					</div>
					<div>
						<label>Precio Maximo</label>
						<input
							type='number'
							value={precioMax ?? ''}
							onChange={e => setPrecioMax(+e.target.value)}
						/>
					</div>
					<div>
						<label>Fecha Inicial</label>
						<input
							type='date'
							value={fechaInicial ?? ''}
							onChange={e => setFechaInicial(e.target.value)}
						/>
					</div>
					<div>
						<label>Fecha Final</label>
						<input
							type='date'
							value={fechaFinal ?? ''}
							onChange={e => setFechaFinal(e.target.value)}
						/>
					</div>
				</div>
				<div className='contenedor-borrar-filtro'>
					<button onClick={resetearFiltro}>Resetear Filtro</button>
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
