import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Pedido } from '../../types/pedido.types';

import './pedido-detalles.styles.scss';

interface PedidosParams {
	pedido_id: string;
}

interface PedidoResponseData {
	data: Pedido;
}

export const PedidoDetalles: React.FC<RouteComponentProps<PedidosParams>> = ({
	match,
	location,
}) => {
	const [pedido_url] = useState(location.pathname);
	const [pedido, setPedido] = useState({} as Pedido);

	useEffect(() => {
		axios({
			url: pedido_url,
		})
			.then((res: PedidoResponseData) => setPedido(res.data))
			.catch(err => alert('URL Invalido'));
	}, [pedido_url]);

	console.log(pedido);
	return (
		<div className='contenedor-pedido-detalles'>
			<h1>Detalles</h1>
		</div>
	);
};

export default withRouter(PedidoDetalles);
