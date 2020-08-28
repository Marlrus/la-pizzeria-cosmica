import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './pedido-detalles.styles.scss';
import { formatearPedido } from '../../utils/utils';
import Spinner from '../../components/spinner/spinner.component';

interface PedidosParams {
	pedido_id: string;
}

interface PedidoResponseData {
	data: Pedido;
	status: number;
}

interface ParsedPedido {
	fecha: string;
	precio: string;
	ingredientes: {
		precio: string;
		nombre: string;
	}[];
	nombre_cliente: string;
	nombre_pizza: string;
	telefono: number;
	_id: string;
}

export const PedidoDetalles: React.FC<RouteComponentProps<PedidosParams>> = ({
	location,
}) => {
	const [pedido_url] = useState(location.pathname);
	const [pedido, setPedido] = useState({} as ParsedPedido);

	useEffect(() => {
		axios({
			url: pedido_url,
		})
			.then((res: PedidoResponseData) =>
				setPedido(formatearPedido(res.data)),
			)
			.catch(err => alert('URL Invalido'));
	}, [pedido_url]);

	const pedidoCargando = Object.keys(pedido).length === 0 ? true : false;
	return (
		<div className='contenedor-pedido-detalles'>
			{!pedidoCargando ? (
				<>
					<h1>Detalles del pedido de {pedido.nombre_cliente}</h1>
					<table>
						<thead>
							<tr>
								<th>Cliente</th>
								<th>Fecha</th>
								<th>Precio</th>
								<th>Telefono</th>
								<th>Nombre Pizza</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{pedido.nombre_cliente}</td>
								<td>{pedido.fecha}</td>
								<td>{pedido.precio}</td>
								<td>{pedido.telefono}</td>
								<td>{pedido.nombre_pizza}</td>
							</tr>
						</tbody>
					</table>
					<h2>
						Los {pedido?.ingredientes?.length} Ingredientes de la Pizza{' '}
						{pedido.nombre_pizza}
					</h2>
					<table>
						<tbody>
							<tr>
								{pedido?.ingredientes?.map((ingrediente, i) => (
									<td key={ingrediente.nombre}>
										{ingrediente.nombre}{' '}
										<strong>{ingrediente.precio}</strong>
									</td>
								))}
								<td>
									<strong>Total:</strong> {pedido.precio}
								</td>
							</tr>
						</tbody>
					</table>
				</>
			) : (
				<Spinner />
			)}
			<Link className='link-a-dash' to='/pedidos'>
				Volver a Dashboard
			</Link>
		</div>
	);
};

export default withRouter(PedidoDetalles);
